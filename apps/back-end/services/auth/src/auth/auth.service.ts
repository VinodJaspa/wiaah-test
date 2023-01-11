import { generateVerificationToken } from '@utils';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  GoneException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Registeration } from '../../prisma/generated';
import { PrismaService } from 'src/prisma.service';
import {
  AddToDate,
  KafkaMessageHandler,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
} from 'nest-utils';
import { LoginDto, RegisterDto, VerifyEmailDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SERVICES } from 'nest-utils';
import {
  AccountRegisteredEvent,
  AccountVerifiedEvent,
  ChangePasswordEvent,
  EmailExistsMessage,
  EmailExistsMessageReply,
  GetAccountByIdMessage,
  GetAccountByIdMessageReply,
  GetAccountMetaDataByEmailMessage,
  GetAccountMetaDataByEmailMessageReply,
  NewRegisterationTokenRequestedEvent,
  PasswordChangedEvent,
} from 'nest-dto';
import { ForgotPasswordEmailInput } from './dto/forgotPasswordEmail.input';
import { ConfirmPasswordChangeInput } from './dto/confirmPasswordChange.input';

@Injectable()
export class AuthService {
  registerationVerificationTokenValidDurationInMin: number;
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.AUTH_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly JWTService: JwtService,
  ) {
    this.registerationVerificationTokenValidDurationInMin = 30;
  }

  async register(createAuthInput: RegisterDto): Promise<boolean> {
    try {
      const { email, firstName, lastName, accountType } = createAuthInput;

      const registerations = await this.getRegisterationsByEmail(email);
      if (registerations.length > 0)
        await this.removeRegisterationsByEmail(email);

      // generate random verification code
      const verificationCode = `${generateVerificationToken()}`;

      // create registeration enitity to track verification email proccess
      await this.prisma.registeration.create({
        data: {
          email,
          expiresAt: AddToDate(new Date(), {}),
          verificationCode,
        },
      });

      this.eventsClient.emit<any, AccountRegisteredEvent>(
        KAFKA_EVENTS.AUTH_EVENTS.accountRegistered,
        new AccountRegisteredEvent({
          firstName,
          lastName,
          email,
          accountType,
          verificationCode,
        }),
      );

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyEmail(input: { code: string; email: string }) {
    try {
      const { email, code } = input;

      const registeration = await this.prisma.registeration.findUnique({
        where: {
          email,
        },
        rejectOnNotFound(error) {
          throw new BadRequestException('invalid email');
        },
      });

      if (registeration.verificationCode !== code)
        throw new BadRequestException('invalid verification code');
      if (registeration.expiresAt < new Date())
        throw new GoneException('token expired');

      await this.removeRegisterationsByEmail(email);

      this.eventsClient.emit<any, AccountVerifiedEvent>(
        KAFKA_EVENTS.AUTH_EVENTS.accountVerified,
        new AccountVerifiedEvent({ email }),
      );

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async resendRegisterationToken(email: string) {
    const verificationCode = `${generateVerificationToken()}`;
    const expiresAt = AddToDate(new Date(), {
      minutes: this.registerationVerificationTokenValidDurationInMin,
    });

    await this.prisma.registeration.upsert({
      create: {
        email,
        expiresAt,
        verificationCode,
      },
      update: {
        verificationCode,
        expiresAt,
      },
      where: { email },
    });

    this.eventsClient.emit<any, NewRegisterationTokenRequestedEvent>(
      KAFKA_EVENTS.AUTH_EVENTS.newRegisterationTokenRequest,
      new NewRegisterationTokenRequestedEvent({
        email,
        token: verificationCode,
      }),
    );
    return true;
  }

  async generateAccessToken(id: string, email: string, accountType: string) {
    return {
      access_token: this.JWTService.sign({
        id,
        email,
        accountType,
      }),
    };
  }

  async login(input: LoginDto): Promise<{ access_token: string }> {
    const { email, id, accountType } = await this.validateCredentials(
      input.email,
      input.password,
    );
    return this.generateAccessToken(id, email, accountType);
  }

  async loginAs(id: string) {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetAccountByIdMessage,
      GetAccountByIdMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountById,
      new GetAccountByIdMessage({
        accountId: id,
      }),
    );

    if (!success || !data)
      throw new InternalServerErrorException('error getting user data');

    const { email, accountType } = data;

    return this.generateAccessToken(id, email, accountType);
  }

  async requestPasswordChange({ email }: ForgotPasswordEmailInput) {
    const {
      results: { data, error, success },
    } = await this.getAccountMetaDataByEmail(email);
    if (!success) throw error;
    const { firstName, username, id: accountId } = data;
    const verificationCode = generateVerificationToken();

    const createdPasswordChangeRequest =
      await this.prisma.changePasswordRequest.upsert({
        create: {
          email,
          verificationCode,
          accountId,
        },
        update: {
          verificationCode,
          accountId,
        },
        where: {
          email,
        },
        select: { email: true, verificationCode: true },
      });

    this.eventsClient.emit(
      KAFKA_EVENTS.AUTH_EVENTS.passwordChangeRequest,
      new ChangePasswordEvent({
        email: createdPasswordChangeRequest.email,
        name: firstName || username || 'Customer',
        verificationCode: createdPasswordChangeRequest.verificationCode,
      }),
    );
  }

  async confirmPasswordChange({
    confirmNewPassword,
    newPassword,
    verificationCode,
    email,
  }: ConfirmPasswordChangeInput) {
    const changeRequest = await this.prisma.changePasswordRequest.findUnique({
      where: {
        email,
      },
      rejectOnNotFound(error) {
        throw new NotFoundException(
          'there is no password change request for this email, consider asking for a password change first',
        );
      },
    });

    if (changeRequest.verificationCode !== verificationCode)
      throw new BadRequestException('wrong verification code');
    if (confirmNewPassword !== newPassword)
      throw new BadRequestException('confirm Password and password must match');

    const hashedNewPassword = await this.hashPassword(newPassword);

    // everything went right, emit an password changed event
    await this.emitPasswordChange(
      email,
      hashedNewPassword,
      changeRequest.accountId,
    );
  }

  async emitPasswordChange(email: string, newPass: string, accountId: string) {
    this.eventsClient.emit(
      KAFKA_EVENTS.AUTH_EVENTS.passwordChanged,
      new PasswordChangedEvent({
        email,
        newPassword: newPass,
        id: accountId,
      }),
    );
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<{ email: string; id: string; accountType: string }> {
    const {
      results: { data, error, success },
    } = await this.getAccountMetaDataByEmail(email);

    if (!success) {
      throw new InternalServerErrorException(error || 'error validating email');
    }

    if (!data)
      throw new NotFoundException('account with this email was not found');

    const { password: hashedPassword, ...rest } = data;

    const compere = await bcrypt.compare(password, hashedPassword);

    if (!compere) throw new BadRequestException('wrong password');

    return rest;
  }

  async getAccountMetaDataByEmail(email: string) {
    return await KafkaMessageHandler<
      any,
      GetAccountMetaDataByEmailMessage,
      GetAccountMetaDataByEmailMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountByEmail,
      new GetAccountMetaDataByEmailMessage({ email }),
    );
  }

  async getAll(): Promise<Registeration[]> {
    const registartions = await this.prisma.registeration.findMany();
    return registartions;
  }

  async removeAll() {
    await this.prisma.registeration.deleteMany();
    return true;
  }

  private async getRegisterationsByEmail(email: string) {
    return this.prisma.registeration.findMany({
      where: {
        email,
      },
    });
  }

  private async removeRegisterationsByEmail(email: string) {
    return this.prisma.registeration.deleteMany({
      where: {
        email,
      },
    });
  }

  async emailExists(email: string): Promise<boolean> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      EmailExistsMessage,
      EmailExistsMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.emailExists,
      new EmailExistsMessage({ email }),
      'email validation timed out',
    );
    if (!success) throw new Error('error validating email');
    const { emailExists } = data;
    return emailExists;
  }
}
