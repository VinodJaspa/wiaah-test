import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ContentSuspenseRequestEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { UpdateProfileStatusCommand } from '@profile/commands';
import { ProfileStatus, PROFILE_SERVICE_KEY } from '@profile/const';

@Controller()
export class ProfileController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(
    KAFKA_EVENTS.MODERATION.contentSuspenseRequest(PROFILE_SERVICE_KEY),
  )
  handleProfileSuspense(
    @Payload() { value }: { value: ContentSuspenseRequestEvent },
  ) {
    this.commandbus.execute(
      new UpdateProfileStatusCommand(value.input.id, ProfileStatus.suspended),
    );
  }
}
