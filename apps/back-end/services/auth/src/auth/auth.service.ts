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
import { ACCOUNTS_SERVICE } from 'src/ServicesTokens';
import { CreateRegisterationDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ACCOUNTS_SERVICE.token)
    private readonly accountsClient: ClientKafka,
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

            if (confirmPassword !== password)
              throw new BadRequestException(
                'confirm password and password fields must match',
              );

            await this.prisma.registeration.create({
              data: {
                verificationToken: 'test token',
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
