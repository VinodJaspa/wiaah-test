import { Module } from '@nestjs/common';
import { UserContactsResolver } from './user-contacts.resolver';

@Module({
  providers: [UserContactsResolver],
})
export class UserContactsModule {}
