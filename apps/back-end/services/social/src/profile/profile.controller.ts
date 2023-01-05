import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  ContentSuspenseRequestEvent,
  GetUserFollowersData,
  GetUserFollowersDataReply,
} from 'nest-dto';
import { KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';
import { UpdateProfileStatusCommand } from '@profile/commands';
import { ProfileStatus, PROFILE_SERVICE_KEY } from '@profile/const';
import { PrismaService } from 'prismaService';

@Controller()
export class ProfileController {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

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

  @MessagePattern(KAFKA_MESSAGES.SOCIAL_MESSAGES.getUserFollowsData())
  async handleGetFollowsData(
    @Payload() { value }: { value: GetUserFollowersData },
  ): Promise<GetUserFollowersDataReply> {
    const {
      input: { pagination, userId },
    } = value;

    const profile = await this.prisma.profile.findUnique({
      where: {
        ownerId: userId,
      },
    });

    return new GetUserFollowersDataReply({
      data: {
        ids: [],
        total: profile.followers,
      },
      error: null,
      success: true,
    });
  }
}
