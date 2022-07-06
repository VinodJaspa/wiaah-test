import { Module } from '@nestjs/common';
import { VouchersManagementService } from './vouchers-management.service';
import { VouchersManagementResolver } from './vouchers-management.resolver';
import { PrismaService } from 'src/prisma.service';
import { VouchersManagementController } from './vouchers-management.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  KAFKA_BROKERS,
  KAFKA_SERVICE_CLIENTID,
  KAFKA_SERVICE_GROUPID,
  KAFKA_SERVICE_TOKEN,
} from 'nest-utils';

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
  providers: [
    VouchersManagementResolver,
    VouchersManagementService,
    PrismaService,
  ],
  controllers: [VouchersManagementController],
})
export class VouchersManagementModule {}
