import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ContentSuspenseRequestEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { PostStatus } from 'prismaClient';
import { UpdatePostStatusCommand } from './commands';
import { POST_TYPES } from './const';

@Controller()
export class NewsfeedPostsController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(
    KAFKA_EVENTS.MODERATION.contentSuspenseRequest(POST_TYPES.newsfeedPost),
  )
  handlePostSuspended(
    @Payload() { value }: { value: ContentSuspenseRequestEvent },
  ) {
    this.commandbus.execute(
      new UpdatePostStatusCommand(value.input.id, PostStatus.suspended),
    );
  }
}
