import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReactionInput } from '@input';
import { ContentReaction } from '@entities';
import { PrismaService } from 'prismaService';
import { DBErrorException, KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { ProfileService } from '@profile-service';
import { ContentDiscoveryService } from '@content-discovery';
import { ContentNotFoundException } from '@exceptions';
import { ContentReactedEvent } from 'nest-dto';

@Injectable()
export class ReactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfileService,
    private readonly contentDiscoveryService: ContentDiscoveryService,
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  logger = new Logger('ReactionService');

  async createReaction(
    createReactionInput: CreateReactionInput,
    userId: string,
  ): Promise<ContentReaction> {
    const { contentId, contentType, authorProfileId } = createReactionInput;

    // make sure the required content is avaiable in the database
    const content = await this.contentDiscoveryService.getContent(
      contentType,
      contentId,
    );
    if (!content) throw new ContentNotFoundException();

    // validate the user have the right premission to react on this content
    const profileId = await this.profileService.getProfileIdByUserId(userId);
    const canInteract = await this.profileService.canInteractWith(
      authorProfileId,
      profileId,
    );
    if (!canInteract) throw new UnauthorizedException();

    try {
      const reaction = await this.prisma.contentReaction.create({
        data: {
          hostId: contentId,
          hostType: contentType,
          reactionType: 'like',
          reactedByProfileId: profileId,
          userId,
        },
      });

      // TODO: create kafka event
      this.eventClient.emit(
        KAFKA_EVENTS.REACTION_EVENTS.contentReacted,
        new ContentReactedEvent({
          contentAuthorProfileId: authorProfileId,
          contentAuthorUserId: content.userId,
          contentId,
          reacterProfileId: profileId,
          reacterUserId: userId,
          contentType,
          contentTitle: content.content,
        }),
      );

      return Object.assign(reaction, { reactedBy: null });
    } catch (error) {
      throw new DBErrorException(
        'Faild to create reaction, please try again later',
      );
    }
  }

  async removeReaction(
    input: CreateReactionInput,
    userId: string,
  ): Promise<boolean> {
    const { contentId, contentType } = input;
    try {
      await this.prisma.contentReaction.deleteMany({
        where: {
          AND: {
            hostType: contentType,
            hostId: contentId,
            userId,
          },
        },
      });

      return true;
    } catch (error) {
      throw new DBErrorException(
        'failed to remove reaction, please try again later',
      );
    }
  }
}
