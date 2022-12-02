import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { NewPostCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { POST_TYPES } from '@posts-newsfeed/const';
import { PostCreatedEvent } from '@posts-newsfeed/events/impl';
import { Inject } from '@nestjs/common';

@EventsHandler(PostCreatedEvent)
export class PostCreatedEventHandler
  implements IEventHandler<PostCreatedEvent>
{
  constructor(
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ post, userId }: PostCreatedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.NEWSFEED_POST_EVENTS.postCreated,
      new NewPostCreatedEvent({
        authorId: userId,
        postId: post.id,
        postType: POST_TYPES.newsfeedPost,
        refId: null,
      }),
    );
  }
}
