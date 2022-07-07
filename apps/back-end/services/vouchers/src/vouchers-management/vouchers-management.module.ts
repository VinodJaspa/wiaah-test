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
  SERVICES,
} from 'nest-utils';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.VOUCHERS_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.VOUCHERS_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.VOUCHERS_SERVICE.groupId,
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
