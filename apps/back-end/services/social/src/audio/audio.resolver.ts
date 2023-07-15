import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AudioService } from './audio.service';
import { Audio, AudioCursorPaginationResponse } from './entities/audio.entity';
import { PrismaService } from 'prismaService';

@Resolver(() => Audio)
export class AudioResolver {
  constructor(
    private readonly audioService: AudioService,
    private prisma: PrismaService,
  ) {}

  @Query(() => AudioCursorPaginationResponse)
  async getAudioById(@Args('id') id: string) {
    return this.prisma.contentAudio.findUnique({
      where: {
        id,
      },
    });
  }

  @ResolveField(() => String, { nullable: true })
  async src(@Parent() audio: Audio) {
    const _audio = await this.prisma.mediaUpload.findUnique({
      where: {
        id: audio.uploadId,
      },
    });

    return _audio.src;
  }
}
