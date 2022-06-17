import { generateVerificationToken } from '@lib';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Registeration } from '@prisma/client';
import { KAFKA_EVENTS } from 'src/KafkaEvents';
import { PrismaService } from 'src/prisma.service';
import { ACCOUNTS_SERVICE, MAILING_SERVICE } from 'src/ServicesTokens';
import { CreateRegisterationDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ACCOUNTS_SERVICE.token)
    private readonly accountsClient: ClientKafka,
    @Inject(MAILING_SERVICE.token) private readonly mailingClient: ClientKafka,
  ) {}

  async register(createAuthInput: CreateRegisterationDto) {
    try {
      return await new Promise((res, rej) => {
        const { confirmPassword, email, firstName, lastName, password } =
          createAuthInput;
        // communicate with accounts service and check if account with this email already exists
        this.accountsClient
          .send(KAFKA_EVENTS.emailExists, {
            email,
          })
          .subscribe(async (emailExists) => {
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

            // generate random verification code
            const verificationToken = `${generateVerificationToken()}`;

            // create registeration enitity to track verification email proccess
            await this.prisma.registeration.create({
              data: {
                verificationToken,
                accountInputData: {
                  create: {
                    email,
                    firstName,
                    lastName,
                    password,
                  },
                },
              },
              select: {
                accountInputData: {
                  select: {
                    email: true,
                  },
                },
              },
            });

            // when success, communicate with mailing to send a new verification email

            this.mailingClient.emit('send_email_verification_mail', {
              verificationToken,
              email,
            });

            res(true);
          });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll(): Promise<Registeration[]> {
    const registartions = await this.prisma.registeration.findMany({
      include: {
        accountInputData: true,
      },
    });
    return registartions;
  }

  async removeAll() {
    await this.prisma.accountInputsData.deleteMany();
    await this.prisma.registeration.deleteMany();
    return true;
  }
}
