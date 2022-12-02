import { ContentDiscoveryService } from '@content-discovery';
import { ContentManagementService } from '@content-management';
import { ContentShare } from '@entities';
import { ContentNotFoundException } from '@exceptions';
import { CreateContentShareInput } from '@input';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ProfileService } from '@profile';
import { ContentSharedEvent } from 'nest-dto';
import { DBErrorException, KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Injectable()
export class ContentShareService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfileService,
    private readonly contentDiscovery: ContentDiscoveryService,
    private readonly contentManagement: ContentManagementService,
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async createShare(
    createContentShareInput: CreateContentShareInput,
    userId: string,
  ): Promise<ContentShare> {
    const { contentId, contentType } = createContentShareInput;

    const content = await this.contentDiscovery.getContent(
      contentType,
      contentId,
    );
    if (!content) throw new ContentNotFoundException();

    const SharedByProfileId = await this.profileService.getProfileIdByUserId(
      userId,
    );

    try {
      const share = await this.prisma.contentShare.create({
        data: {
          hostId: contentId,
          hostType: contentType,
          sharedByUserId: userId,
          sharedAt: new Date(),
          sharedByProfileId: SharedByProfileId,
        },
      });

      this.eventClient.emit(
        KAFKA_EVENTS.SHARES_EVENTS.contentShared,
        new ContentSharedEvent({
          contentAuthorProfileId: content.authorProfileId,
          contentAuthorUserId: content.userId,
          contentId,
          contentType,
          sharedAt: share.sharedAt.toString(),
          sharedByProfileId: SharedByProfileId,
          sharedByUserId: userId,
        }),
      );

      await this.contentManagement.incrementContentShares(
        contentType,
        contentId,
      );

      return share;
    } catch (error) {
      throw new DBErrorException(
        'Failed to share this content, please try again later',
      );
    }
  }

  findAll(): Promise<ContentShare[]> {
    return this.prisma.contentShare.findMany();
  }
}
