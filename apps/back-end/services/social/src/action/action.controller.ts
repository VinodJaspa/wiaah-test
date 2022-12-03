import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { ACTION_CONTENT_TYPE } from '@action/const';
import {
  CommentCreatedEvent,
  CommentDeletedEvent,
  ContentReactedEvent,
  ContentUnReactedEvent,
} from 'nest-dto';
import { CommandBus } from '@nestjs/cqrs';
import {
  DecreaseActionCommentCountCommand,
  DecreaseActionReactionCountCommand,
  IncreaseActionCommentCountCommand,
  IncreaseActionReactionCountCommand,
} from '@action/commands';

@Controller()
export class ActionController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(
    KAFKA_EVENTS.REACTION_EVENTS.contentReacted(ACTION_CONTENT_TYPE),
  )
  handleActionReaction(@Payload() { value }: { value: ContentReactedEvent }) {
    this.commandbus.execute(
      new IncreaseActionReactionCountCommand(value.input.contentId),
    );
  }

  @EventPattern(
    KAFKA_EVENTS.REACTION_EVENTS.contentUnReacted(ACTION_CONTENT_TYPE),
  )
  handleActionUnReaction(
    @Payload() { value }: { value: ContentUnReactedEvent },
  ) {
    this.commandbus.execute(
      new DecreaseActionReactionCountCommand(value.input.contentId),
    );
  }

  @EventPattern(
    KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated(ACTION_CONTENT_TYPE),
  )
  handleActionComment(@Payload() { value }: { value: CommentCreatedEvent }) {
    this.commandbus.execute(
      new IncreaseActionCommentCountCommand(value.input.hostId),
    );
  }

  @EventPattern(
    KAFKA_EVENTS.COMMENTS_EVENTS.commentDeleted(ACTION_CONTENT_TYPE),
  )
  handleActionCommentDeleted(
    @Payload() { value }: { value: CommentDeletedEvent },
  ) {
    this.commandbus.execute(
      new DecreaseActionCommentCountCommand(value.input.contentId),
    );
  }
}
