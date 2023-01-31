import { Module } from '@nestjs/common';
import { RestService } from './rest.service';
import { RestResolver } from './rest.resolver';

@Module({
  providers: [RestResolver, RestService]
})
export class RestModule {}
