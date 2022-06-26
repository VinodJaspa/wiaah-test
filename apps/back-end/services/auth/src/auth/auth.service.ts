import { generateVerificationToken } from '@lib';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Registeration } from '../../prisma/generated';
import { PrismaService } from 'src/prisma.service';
import { KafkaMessageHandler, KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';
import { LoginDto, RegisterDto, VerifyEmailDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Account } from './types';
import { JwtService } from '@nestjs/jwt';
import { SERVICES } from 'nest-utils';
import {
  EmailExistsMessage,
  EmailExistsMessageReply,
  SendVerificationEmailEvent,
} from 'nest-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly accountsClient: ClientKafka,
    @Inject(SERVICES.MAILING_SERVICE.token)
    private readonly mailingClient: ClientKafka,
    private readonly JWTService: JwtService,
  ) {}

  async register(createAuthInput: RegisterDto): Promise<boolean> {
    try {
      const { confirmPassword, email, firstName, lastName, password } =
        createAuthInput;

      const emailExists = await this.emailExists(email);

      if (emailExists === true) {
        throw new NotAcceptableException('this email is already taken');
      }

      if (confirmPassword !== password) {
        throw new NotAcceptableException(
          'confirm password and password fields must match',
        );
      }

      const registerations = await this.getRegisterationsByEmail(email);
      if (registerations.length > 0)
        await this.removeRegisterationsByEmail(email);

      // generate random verification code
      const verificationToken = `${generateVerificationToken()}`;

      // create registeration enitity to track verification email proccess
      await this.prisma.registeration.create({
        data: {
          email,
          verificationToken,
          accountInputData: {
            firstName,
            lastName,
            password,
          },
        },
        select: {
          email: true,
        },
      });

      // when success, communicate with mailing to send a new verification email
      this.mailingClient.emit<any, SendVerificationEmailEvent>(
        KAFKA_EVENTS.MAILING_EVENTS.sendVerificationEmail,
        new SendVerificationEmailEvent({ email, verificationToken }),
      );

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyEmail(inputs: VerifyEmailDto) {
    try {
      const { email, verificationCode } = inputs;

      const registeration = await this.prisma.registeration.findUnique({
        where: {
          email,
        },
        rejectOnNotFound(error) {
          throw new BadRequestException('invalid email');
        },
      });

      if (registeration.verificationToken !== verificationCode)
        throw new BadRequestException('invalid verification code');

      await this.removeRegisterationsByEmail(email);

      const {
        accountInputData: { firstName, lastName, password },
      } = registeration;

      const hashedPassword = await bcrypt.hash(password, 10);
      this.accountsClient.emit(KAFKA_EVENTS.createAccount, {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(input: LoginDto): Promise<{ access_token: string }> {
    try {
      const { email, firstName, lastName, id, accountType } =
        await this.validateCredentials(input.email, input.password);
      return {
        access_token: this.JWTService.sign({
          id,
          email,
          firstName,
          lastName,
          accountType,
        }),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  private async validateCredentials(
    email: string,
    password: string,
  ): Promise<Omit<Account, 'password'>> {
    return await new Promise((res, rej) => {
      const timeout = setTimeout(() => {
        rej(new InternalServerErrorException('password validation timed out'));
        request.unsubscribe();
      }, 5000);
      const request = this.accountsClient
        .send(KAFKA_MESSAGES.getAccountByEmail, { email })
        .subscribe(async (account: Account) => {
          if (!account) {
            rej(new NotFoundException('no account with this email was found'));
            return;
          }

          const compere = await bcrypt.compare(password, account.password);

          if (!compere) rej(new BadRequestException('wrong password'));

          const { password: _, ...rest } = account;

          res(rest);
          clearTimeout(timeout);
        });
    });
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
      results: {
        data: { emailExists },
        error,
        success,
      },
    } = await KafkaMessageHandler<
      string,
      EmailExistsMessage,
      EmailExistsMessageReply
    >(
      this.accountsClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.emailExists,
      new EmailExistsMessage({ email }),
      'email validation timed out',
    );
    if (!success) throw new Error('error validating email');
    return emailExists;
  }
}
