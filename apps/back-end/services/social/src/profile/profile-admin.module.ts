import { Module } from '@nestjs/common';
import { ProfileAdminResolver } from './profile-admin.resolver';

@Module({
  providers: [ProfileAdminResolver],
})
export class ProfileAdminModule {}
