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
    const passConfirmValid = input.newPassword === input.confirmNewPassword;
    if (!passConfirmValid)
      throw new BadRequestException(
        'new password and confirm password does not match',
      );

    const acc = await this.service.getAccountMetaDataByEmail(user.email);

    const currPass = acc?.results?.data?.password;

    const valid = await bcrypt.compare(input.currentPassword, currPass);

    if (!valid)
      throw new BadRequestException('the current password provided is wrong');

    const newHashedPass = await this.service.hashPassword(input.newPassword);

    await this.service.emitPasswordChange(user.email, newHashedPass, user.id);

    return true;
  }
}
