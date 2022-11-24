import { Resolver } from '@nestjs/graphql';
import { AuthOtp } from './entities/auth-otp.entity';
import { CommandBus } from '@nestjs/cqrs';

@Resolver(() => AuthOtp)
export class AuthOtpResolver {
  constructor(private readonly commandbus: CommandBus) {}
}
