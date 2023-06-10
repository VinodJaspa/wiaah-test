import { Module } from '@nestjs/common';
import { ContactusResolver } from './contactus.resolver';

@Module({
  providers: [ContactusResolver],
})
export class ContactusModule {}
