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
import { Registeration } from '@prisma/client';
import { KAFKA_EVENTS } from 'src/KafkaEvents';
import { PrismaService } from 'src/prisma.service';
import { ACCOUNTS_SERVICE, MAILING_SERVICE } from 'src/ServicesTokens';
import { LoginDto, RegisterDto, VerifyEmailDto } from './dto';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './responses/LoginResponse';
import { Account } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ACCOUNTS_SERVICE.token)
    private readonly accountsClient: ClientKafka,
    @Inject(MAILING_SERVICE.token) private readonly mailingClient: ClientKafka,
    private readonly JWTService: JwtService,
  ) {}

  async register(createAuthInput: RegisterDto) {
    try {
      const { confirmPassword, email, firstName, lastName, password } =
        createAuthInput;

      return new Promise((res, rej) => {
        // timeout function to prevent request hanging
        let timeout = setTimeout(() => {
          subscription.unsubscribe();
          return rej(
            new InternalServerErrorException(
              'email existing validation timed out',
            ),
          );
        }, 3000);

        const request = this.accountsClient.send(KAFKA_EVENTS.emailExists, {
          email,
        });

        // communicate with accounts service and check if account with this email already exists
        const subscription = request.subscribe(async (emailExists) => {
          if (emailExists === 'true') {
            return rej(
              new NotAcceptableException('this email is already taken'),
            );
          }

          if (confirmPassword !== password) {
            return rej(
              new NotAcceptableException(
                'confirm password and password fields must match',
              ),
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
          this.mailingClient.emit('send_email_verification_mail', {
            verificationToken,
            email,
          });

          // everything went right, resolve the promise
          res(true);
          // make sure to clear the timeout
          clearTimeout(timeout);
          // make sure to unsubscribe to the kafka listener
          subscription.unsubscribe();
        });
      });
    } catch (error) {
      return new Error(error);
    }
  }

  async verifyEmail(inputs: VerifyEmailDto) {
    try {
      const { email, verificationCode } = inputs;
      console.log(email, verificationCode);
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

      this.removeRegisterationsByEmail(email);

      const {
        accountInputData: { firstName, lastName, password },
      } = registeration;

      const hashedPassword = await bcrypt.hash(password, 10);
      this.accountsClient.emit('create_account', {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });

      return registeration;
    } catch (error) {
      return new Error(error);
    }
  }

  async login(input: LoginDto): Promise<LoginResponse> {
    try {
      const { email, firstName, lastName } = await this.validateCredentials(
        input.email,
        input.password,
      );
      return {
        access_token: this.JWTService.sign({
          email,
          firstName,
          lastName,
        }),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateCredentials(
    email: string,
    password: string,
  ): Promise<Omit<Account, 'password'>> {
    return await new Promise((res, rej) => {
      const timeout = setTimeout(() => {
        rej(new InternalServerErrorException('password validation timed out'));
        request.unsubscribe();
      }, 5000);
      const request = this.accountsClient
        .send(KAFKA_EVENTS.getAccountByEmail, { email })
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

  async getRegisterationsByEmail(email: string) {
    return this.prisma.registeration.findMany({
      where: {
        email,
      },
    });
  }

  async removeRegisterationsByEmail(email: string) {
    return this.prisma.registeration.deleteMany({
      where: {
        email,
      },
    });
  }
}
