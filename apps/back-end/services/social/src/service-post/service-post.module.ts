import { Module } from '@nestjs/common';
import { ServicePostResolver } from './service-post.resolver';
import { ServicePostController } from './service-post.controller';
import { kafkaModule } from '@kafkaModule';

@Module({
  imports: [kafkaModule],
  providers: [ServicePostResolver],
  controllers: [ServicePostController],
})
export class ServicePostModule {}
