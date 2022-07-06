import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceResolver } from './balance.resolver';
import { PrismaService } from 'src/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  KAFKA_BROKERS,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_CLIENTID,
  KAFKA_SERVICE_GROUPID,
  KAFKA_SERVICE_TOKEN,
} from 'nest-utils';
import { BalanceController } from './balance.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_SERVICE_TOKEN,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: KAFKA_SERVICE_CLIENTID,
          },
          consumer: {
            groupId: KAFKA_SERVICE_GROUPID,
          },
        },
      },
    ]),
  ],
  providers: [BalanceResolver, BalanceService, PrismaService],
  exports: [BalanceService],
  controllers: [BalanceController],
})
export class BalanceModule {}
