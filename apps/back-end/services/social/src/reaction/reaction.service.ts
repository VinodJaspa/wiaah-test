import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReactionInput, RemoveReactionInput } from '@input';
import { ContentReaction } from '@entities';
import { PrismaService } from 'prismaService';
import { DBErrorException, KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { ProfileService } from '@profile-service';
import { ContentDiscoveryService } from '@content-discovery';
import { ContentNotFoundException } from '@exceptions';
import { ContentReactedEvent, ContentUnReactedEvent } from 'nest-dto';
import { ContentManagementService } from '@content-management';

@Injectable()
export class ReactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfileService,
    private readonly contentDiscoveryService: ContentDiscoveryService,
    private readonly contentManagementService: ContentManagementService,
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  logger = new Logger('ReactionService');

  async createReaction(
    createReactionInput: CreateReactionInput,
    userId: string,
  ): Promise<ContentReaction> {
    const { contentId, contentType } = createReactionInput;

    // make sure the required content is avaiable in the database
    const content = await this.contentDiscoveryService.getContent(
      contentType,
      contentId,
    );

    if (!content) throw new ContentNotFoundException();

    // validate the user have the right premission to react on this content
    const canInteract = await this.profileService.canInteractWith(
      content.userId,
      userId,
    );
    if (!canInteract) throw new UnauthorizedException();

    try {
      const reaction = await this.prisma.contentReaction.create({
        data: {
          hostUserId: content.userId,
          hostId: contentId,
          hostType: contentType,
          reactionType: 'like',
          reactedByUserId: userId,
          userId,
        },
      });

      await this.contentManagementService.incrementContentReactions(
        contentType,
        contentId,
      );

      this.eventClient.emit(
        KAFKA_EVENTS.REACTION_EVENTS.contentReacted(contentType),
        new ContentReactedEvent({
          contentAuthorUserId: content.userId,
          contentId,
          reacterUserId: userId,
          contentType,
          contentTitle: content.content,
        }),
      );

      return reaction;
    } catch (error) {
      throw new DBErrorException(
        'Faild to create reaction, please try again later',
      );
    }
  }

  async removeReaction(
    input: RemoveReactionInput,
    userId: string,
  ): Promise<boolean> {
    const { contentId, contentType } = input;

    const content = await this.contentDiscoveryService.getContent(
      contentType,
      contentId,
    );

    if (content.userId !== userId) throw new UnauthorizedException();

    try {
      const res = await this.prisma.contentReaction.deleteMany({
        where: {
          hostType: contentType,
          hostId: contentId,
          userId,
        },
      });

      if (res.count > 0) {
        await this.contentManagementService.decrementContentReactions(
          contentType,
          contentId,
        );

        this.eventClient.emit(
          KAFKA_EVENTS.REACTION_EVENTS.contentUnReacted(contentType),
          new ContentUnReactedEvent({
            contentId,
            contentType,
            userId,
          }),
        );
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new DBErrorException(
        'failed to remove reaction, please try again later',
      );
    }
  }

  findAll() {
    return this.prisma.contentReaction.findMany();
  }
}
