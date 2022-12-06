import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  CommentCreatedEvent,
  CommentMentionedEvent,
  ContentReactedEvent,
  SocialContentCreatedEvent,
} from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { NotifciationBaseController } from '@manager/abstraction';
import {
  GetUserDataQuery,
  GetUserFollowersIdsQuery,
  GetUserFollowersIdsQueryRes,
} from '@manager/queries';
import { ContentType } from '@manager/const';

@Controller()
export class ManagerController extends NotifciationBaseController {
  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated)
  handleCommentCreatedEvent(@Payload() data: { value: CommentCreatedEvent }) {
    const {
      commentedByUserId,
      hostType,
      mainHostId,
      commentedByProfileId,
      contentOwnerUserId,
    } = data.value.input;
    this.service.createNotification({
      type: hostType === 'comment' ? 'commentCommented' : 'postCommented',
      authorId: commentedByUserId,
      content: '',
      contentId: mainHostId,
      authorProfileId: commentedByProfileId,
      contentOwnerUserId,
    });
  }

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentMentions)
  handleCommentMentionsEvent(
    @Payload() data: { value: CommentMentionedEvent },
  ) {
    const {
      mentionedIds,
      mentionedByProfileId,
      mainHostId,
      mentionedByUserId,
    } = data.value.input;

    Array.isArray(mentionedIds)
      ? mentionedIds.map((id) => {
          this.service.createNotification({
            content: '',
            type: 'commentMention',
            authorId: mentionedByUserId,
            authorProfileId: mentionedByProfileId,
            contentOwnerUserId: id.userId,
            contentId: mainHostId,
          });
        })
      : null;
  }

  @EventPattern(KAFKA_EVENTS.REACTION_EVENTS.contentReacted('*', true))
  handleContentReactedEvent(@Payload() data: { value: ContentReactedEvent }) {
    const {
      contentAuthorUserId,
      contentId,
      contentTitle,
      contentType,
      reacterProfileId,
      reacterUserId,
    } = data.value.input;

    const postsTypes = ['newsfeed-post'];

    this.service.createNotification({
      content: contentTitle,
      contentId,
      type: postsTypes.includes(contentType) ? 'postReacted' : 'commentReacted',
      authorProfileId: reacterProfileId,
      contentOwnerUserId: contentAuthorUserId,
      authorId: reacterUserId,
    });
  }

  @EventPattern(KAFKA_EVENTS.SOCIAL_EVENTS.contentCreated('*', true))
  async handleSocialContentCreatedEvent(
    @Payload() data: { value: SocialContentCreatedEvent },
  ) {
    const { authorId, id, type } = data.value.input;
    const authorDataPromise = this.querybus.execute(
      new GetUserDataQuery(authorId),
    );
    const followersPromise = this.querybus.execute<
      GetUserFollowersIdsQuery,
      GetUserFollowersIdsQueryRes
    >(new GetUserFollowersIdsQuery(authorId));

    const authorData = await authorDataPromise;
    const followers = await followersPromise;

    let contentTitle: string;

    const postsTypes = ['newsfeed-post'];

    switch (type) {
      case ContentType.newsfeed_post:
        contentTitle = `${authorData.name} has posted a new post`;
        break;
      case ContentType.product_post:
        contentTitle = `${authorData.name} has published a new product`;
        break;
      case ContentType.service_post:
        contentTitle = `${authorData.name} has published a new service`;
        break;
      case ContentType.affiliation_post:
        contentTitle = `${authorData.name} has published a new affilation`;
        break;
      default:
        contentTitle = `${authorData.name} has published a new content`;
        break;
    }

    for (const follower of followers) {
      this.service.createNotification({
        content: contentTitle,
        contentId: id,
        type: postsTypes.includes(type) ? 'postReacted' : 'commentReacted',
        contentOwnerUserId: authorId,
        authorId: follower.id,
      });
    }
  }
}
