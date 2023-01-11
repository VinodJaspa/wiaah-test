import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthOtpRequestedEvent } from '@auth/events';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateAuthOtpCommand } from '@auth-otp/commands';
import { AuthOtp } from '@auth-otp/entities';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ResponseCodes } from '@auth/const';
import { sendLoginOTPEvent } from 'nest-dto';

@EventsHandler(AuthOtpRequestedEvent)
export class AuthOtpRequestedEventHandler
  implements IEventHandler<AuthOtpRequestedEvent>
{
  constructor(
    @Inject(SERVICES.AUTH_SERVICE.token)
    private readonly eventclient: ClientKafka,
    private readonly commandBus: CommandBus,
  ) {}

  async handle({ code: _code, email }: AuthOtpRequestedEvent) {
    const { expiresAt, code } = await this.commandBus.execute<
      CreateAuthOtpCommand,
      AuthOtp
    >(new CreateAuthOtpCommand(email));

    this.eventclient.emit(
      KAFKA_EVENTS.AUTH_EVENTS.sendLoginOTP(
        _code === ResponseCodes.RequireSmsOTP ? 'phone' : 'email',
      ),
      new sendLoginOTPEvent({
        code,
        email,
      }),
    );
  }
}
