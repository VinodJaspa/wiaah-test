import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewAccountCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { AuthService } from './auth.service';
import { RegisterAccountType } from './dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated('*', true))
  async handleAccountCreated(
    @Payload() { value }: { value: NewAccountCreatedEvent },
  ) {
    console.log('registeration event auth', value);
    // await this.authService.register({
    //   accountType: value.input.accountType as RegisterAccountType,
    //   email: value.input.email,
    //   firstName: value.input.firstName,
    //   lastName: value.input.lastName,
    //   birthDate: value.input.birthDate,
    //   password: value.input.password,
    // });
  }
}
