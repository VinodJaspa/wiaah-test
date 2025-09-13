import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewAccountCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { AuthService } from './auth.service';
import { RegisterAccountType } from './dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated('*', true))
  async handleAccountCreated(
    @Payload() payload: any)
   {
    const eventData = payload?.value ?? payload;
  
    if (!eventData || !eventData.input) {
      console.error('Invalid event data for NewAccountCreatedEvent:', eventData);
      return;
    }
    console.log('registeration event auth', eventData);
    await this.authService.register({
      accountType: eventData.input.accountType as RegisterAccountType,
      email: eventData.input.email,
      firstName: eventData.input.firstName,
      lastName: eventData.input.lastName,
      birthDate: eventData.input.birthDate as any,
      password: eventData.input.password,
    });
  }
}
