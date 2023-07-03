import { Args, Query, Resolver } from '@nestjs/graphql';
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
  async getMusicById(@Args('id') id: string) {
    return this.prisma.actionAudio.findUnique({
      where: {
        id,
      },
    });
  }
}
