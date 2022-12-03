import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import {
  NewPostCreatedEvent,
  UserMentionEvent,
  UserTaggedEvent,
} from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { PostCreatedEvent } from '../impl/post-created.event';
import { Inject } from '@nestjs/common';
import { PostType } from 'prismaClient';

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
        postType: PostType.newsfeed_post,
        refId: null,
      }),
    );
  }
}

@EventsHandler(PostCreatedEvent)
export class PostTaggedUsersEventHandler
  implements IEventHandler<PostCreatedEvent>
{
  constructor(
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ post }: PostCreatedEvent) {
    post.tags.forEach((tag) => {
      this.eventClient.emit(
        KAFKA_EVENTS.SOCIAL_EVENTS.userTag(PostType.newsfeed_post),
        new UserTaggedEvent({
          contentId: post.id,
          contentAuthorId: post.userId,
          contentType: PostType.newsfeed_post,
          userId: tag.userId,
        }),
      );
    });
  }
}

@EventsHandler(PostCreatedEvent)
export class PostMentionedUsersEventHandler
  implements IEventHandler<PostCreatedEvent>
{
  constructor(
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ post }: PostCreatedEvent) {
    post.mentions.forEach((mention) => {
      this.eventClient.emit(
        KAFKA_EVENTS.SOCIAL_EVENTS.userTag(PostType.newsfeed_post),
        new UserMentionEvent({
          hostId: post.id,
          hostType: PostType.newsfeed_post,
          mentionedId: mention.userId,
          userId: post.userId,
        }),
      );
    });
  }
}
