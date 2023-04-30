import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { CqrsModule } from '@nestjs/cqrs';
import { ProfileController } from './profile.controller';
import { AccountProfileResolver } from './Account-Profile.resolver';
import { profileResolvers } from './resolvers';
import { ShopProfileResolver } from './resolvers/profile.shop.resolver';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.SOCIAL_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: SERVICES.SOCIAL_SERVICE.clientId,
            brokers: KAFKA_BROKERS,
          },
          consumer: {
            groupId: SERVICES.SOCIAL_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    ProfileResolver,
    ProfileService,
    AccountProfileResolver,
    ShopProfileResolver,
  ],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
