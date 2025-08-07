import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthorizationDecodedUser } from 'nest-utils';
import * as bcrypt from 'bcrypt';

import { AuthService } from '../auth.service';
import { ChangePasswordInput } from '../dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly service: AuthService) {}

  async changeCurrentPassword(
    input: ChangePasswordInput,
    user: AuthorizationDecodedUser,
  ): Promise<boolean> {
  

    // 1. Check if new password matches confirm password
    if (input.newPassword !== input.confirmNewPassword) {
      console.warn('[AuthRepository] New and confirm passwords do not match');
      throw new BadRequestException('New password and confirm password do not match');
    }
    console.log('[AuthRepository] Passwords match confirmed');

    // 2. Get account info
    const acc = await this.service.getAccountMetaDataByEmail(user.email);
    console.log('[AuthRepository] Retrieved account metadata:', acc);

    const currPass = acc?.results?.data?.password;

    if (!currPass) {
      console.error('[AuthRepository] No password found in metadata for user:', user.email);
      throw new BadRequestException('No password found for user');
    }

    if (!input.currentPassword) {
      console.warn('[AuthRepository] Current password not provided');
      throw new BadRequestException('Current password is required');
    }

    // 3. Compare current password with stored password
    const isValid = await bcrypt.compare(input.currentPassword, currPass);

    if (!isValid) {
      console.warn('[AuthRepository] Invalid current password for user:', user.email);
      throw new BadRequestException('The current password provided is incorrect');
    }
    console.log('[AuthRepository] Current password verified successfully');

    // 4. Hash the new password
    const newHashedPass = await this.service.hashPassword(input.newPassword);
    console.log('[AuthRepository] New password hashed successfully');

    // 5. Emit password change event
    await this.service.emitPasswordChange(user.email, newHashedPass, user.id);
    console.log('[AuthRepository] Password change event emitted for user:', user.email);

    return true;
  }
}
