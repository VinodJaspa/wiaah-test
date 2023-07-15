import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Action, GetActionsCursorResponse } from '@action/entities';
import { CreateActionInput, GetUserActionsInput } from '@action/dto';
import {
  AuthorizationDecodedUser,
  BadMediaFormatPublicError,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  InternalServerPublicError,
  KAFKA_MESSAGES,
  KafkaMessageHandler,
  SERVICES,
  UserPreferedLang,
} from 'nest-utils';
import { Inject, UseGuards } from '@nestjs/common';
import { CreateActionCommand } from '@action/commands';
import { GetActionByIdQuery, GetUserActionsQuery } from '@action/queries';
import { UploadService } from '@wiaah/upload';
import { GraphQLUpload, Upload } from 'graphql-upload';
import { PrismaService } from 'prismaService';
import { Profile } from '@entities';
import { ActionTopHashtagResponse } from './entities/action-hashtag';
import { Readable } from 'stream';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import {
  GetActionByAudioIdInput,
  GetActionsByEffectIdInput,
} from './dto/getActionByAudioId.dto';
import { Effect } from 'src/effect/entities/effect.entity';
import { EffectService } from 'src/effect/effect.service';
import { Audio } from 'src/audio/entities/audio.entity';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetBulkUserMostInteractionersMessage,
  GetBulkUserMostInteractionersMessageReply,
  GetUserMostInteractionersMessage,
  GetUserMostInteractionersMessageReply,
} from 'nest-dto';

@Resolver(() => Action)
export class ActionResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
    private readonly uploadService: UploadService,
    private readonly prisma: PrismaService,
    private readonly effectService: EffectService,
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async createAction(
    @Args('args') args: CreateActionInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const actionPromise = this.prisma.mediaUpload.findUnique({
      where: {
        id: args.srcUploadId,
      },
    });

    const coverPromise = this.prisma.mediaUpload.findUnique({
      where: {
        id: args.coverUploadId,
      },
    });

    const thumbnailPromise = this.prisma.mediaUpload.findUnique({
      where: {
        id: args.thumbnailUploadId,
      },
    });

    const action = await actionPromise;
    const cover = await coverPromise;
    const thumbnail = await thumbnailPromise;

    if (!this.uploadService.mimetypes.videos.all.includes(action?.mimeType))
      throw new BadMediaFormatPublicError();

    if (!this.uploadService.mimetypes.videos.all.includes(cover?.mimeType))
      throw new BadMediaFormatPublicError();

    if (!this.uploadService.mimetypes.image.all.includes(thumbnail?.mimeType))
      throw new BadMediaFormatPublicError();

    await this.commandbus.execute<CreateActionCommand, Action>(
      new CreateActionCommand(
        {
          actionCoverSrc: cover.src,
          actionSrc: action.src,
          thumbnailSrc: thumbnail.src,
          ...args,
        },
        user.id,
      ),
    );

    return true;
  }

  @Mutation(() => String)
  @UseGuards(new GqlAuthorizationGuard([]))
  async UploadActionCover(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('file', { type: () => GraphQLUpload }) file: Upload,
  ) {
    const cover = file.file;

    const coverRes = await this.uploadService.uploadFiles([
      {
        file: {
          stream: cover.createReadStream(),
          meta: {
            mimetype: cover.mimetype,
            name: cover.filename,
          },
        },
        options: {
          allowedMimtypes: [
            this.uploadService.mimetypes.videos.mov,
            this.uploadService.mimetypes.videos.mp4,
          ],
          maxSecDuration: 1,
          maxSizeKb: 5000, // <= 5mb limit
        },
      },
    ]);

    const src = coverRes[0];

    if (!src) throw new InternalServerPublicError();

    const Res = await this.prisma.mediaUpload.create({
      data: {
        src: src.src,
        userId: user.id,
        mimeType: cover.mimetype,
      },
    });

    return Res.id;
  }

  @Mutation(() => String)
  @UseGuards(new GqlAuthorizationGuard([]))
  async uploadActionVideo(
    @Args('src', { type: () => GraphQLUpload }) _file: Upload,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    console.log('begin upload', { file: _file });
    const file = _file.file;

    const res = await this.uploadService.uploadFiles([
      {
        file: {
          stream: file.createReadStream(),
          meta: {
            mimetype: file.mimetype,
            name: file.filename,
          },
        },
        options: {
          allowedMimtypes: [
            this.uploadService.mimetypes.videos.mp4,
            this.uploadService.mimetypes.videos.mov,
          ],
          maxSecDuration: 180,
          maxSizeKb: 2 * 1024 * 1024, // <= 2GB limit
        },
      },
    ]);

    const src = res[0];

    console.log('upload complete', { src });
    if (!src) throw new InternalServerPublicError();

    const Res = await this.prisma.mediaUpload.create({
      data: {
        src: res[0]?.src,
        userId: user.id,
        mimeType: file.mimetype,
      },
    });

    console.log('media upload video created', { Res });
    const { createReadStream } = await _file.promise;

    // Create a Readable stream from the video file upload
    const videoStream = createReadStream();

    // Create a new Readable stream to store the audio data
    const audioStream = new Readable();

    // Perform audio extraction logic using ffmpeg
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    // Run audio extraction command reading from the videoStream
    ffmpeg.FS(
      'writeFile',
      'input.mp4',
      await fetchFile(await this.streamToBuffer(videoStream)),
    );
    await ffmpeg.run('-i', 'pipe:0', '-f', 'mp3', 'pipe:1');

    // Read the extracted audio data from the pipe output
    const audioData = ffmpeg.FS('readFile', 'pipe:1');

    // Push audio data to the audio stream
    audioStream.push(audioData);
    audioStream.push(null); // Signal the end of the stream

    console.log('audio stream created', { audioData });
    const uploadedAudio = await this.uploadService.uploadFiles([
      {
        file: {
          meta: {
            mimetype: 'audio/mp3',
            name: `${Res.id}-${new Date().getMilliseconds()}`,
          },
          stream: audioStream,
        },
        options: {
          allowedMimtypes: this.uploadService.mimetypes.audio.all,
        },
      },
    ]);

    console.log('audio uploaded', { uploadedAudio });
    const createdUpload = await this.prisma.mediaUpload.create({
      data: {
        mimeType: uploadedAudio[0].mimetype,
        src: uploadedAudio[0].src,
        userId: user.id,
      },
    });

    console.log('audio media upload', { createdUpload });
    const _res = await this.prisma.contentAudio.create({
      data: {
        authorUserId: createdUpload.userId,
        name: `${file.filename}`,
        uploadId: createdUpload.id,
      },
    });

    console.log('action created', { _res });
    return Res.id;
  }

  @Query(() => ActionTopHashtagResponse)
  async getTopHashtagActions(@Args('tag') tag: string) {
    const topViewed = await this.prisma.action.findFirst({
      where: {
        hashtags: {
          has: tag,
        },
        visibility: 'public',
      },
      orderBy: {
        views: 'desc',
      },
    });
    const topCommented = await this.prisma.action.findFirst({
      where: {
        hashtags: {
          has: tag,
        },
        visibility: 'public',
      },
      orderBy: {
        comments: 'desc',
      },
    });
    const topLiked = await this.prisma.action.findFirst({
      where: {
        hashtags: {
          has: tag,
        },
        visibility: 'public',
      },
      orderBy: {
        reactionNum: 'desc',
      },
    });
    const topShared = await this.prisma.action.findFirst({
      where: {
        hashtags: {
          has: tag,
        },
        visibility: 'public',
      },
      orderBy: {
        shares: 'desc',
      },
    });

    return {
      commented: topCommented,
      liked: topLiked,
      shared: topShared,
      viewed: topViewed,
    };
  }

  @Query(() => GetActionsCursorResponse)
  getUserActions(
    @Args('args') args: GetUserActionsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Action[]> {
    return this.querybus.execute<GetUserActionsQuery>(
      new GetUserActionsQuery(args, user.id),
    );
  }

  @Query(() => Action)
  async getMyRecommendedAction(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Action> {
    return {} as Action;
  }

  @Query(() => [Action])
  getAction(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<GetActionByIdQuery>(
      new GetActionByIdQuery(id, user.id),
    );
  }

  @Query(() => GetActionsCursorResponse)
  async getActionByAudioId(
    @Args('args') args: GetActionByAudioIdInput,
  ): Promise<GetActionsCursorResponse> {
    const [count, audios] = await this.prisma.$transaction([
      this.prisma.action.count({
        where: {
          usedAudioId: args.id,
        },
      }),

      this.prisma.action.findMany({
        where: {
          usedAudioId: args.id,
        },
        cursor: args.cursor
          ? {
              id: args.cursor,
            }
          : undefined,
        take: args.take + 1,
        orderBy: {
          views: 'desc',
        },
      }),
    ]);

    return {
      data: audios,
      hasMore: audios.length > args.take,
      cursor: args.cursor,
      nextCursor: audios?.at(args.take)?.id,
      total: count,
    };
  }

  @Query(() => GetActionsCursorResponse)
  async getActionByEffectId(
    @Args('args') args: GetActionsByEffectIdInput,
  ): Promise<GetActionsCursorResponse> {
    const [count, audios] = await this.prisma.$transaction([
      this.prisma.action.count({
        where: {
          effectId: args.id,
        },
      }),

      this.prisma.action.findMany({
        where: {
          effectId: args.id,
        },
        cursor: args.cursor
          ? {
              id: args.cursor,
            }
          : undefined,
        take: args.take + 1,
        orderBy: {
          views: 'desc',
        },
      }),
    ]);

    return {
      data: audios,
      hasMore: audios.length > args.take,
      cursor: args.cursor,
      nextCursor: audios?.at(args.take)?.id,
      total: count,
    };
  }

  @ResolveField(() => Effect, { nullable: true })
  async effect(
    @Parent() action: Action,
    @GetLang() langId: UserPreferedLang,
  ): Promise<Effect> {
    if (!action.effectId) return null;
    const effect = await this.effectService.getEffect(action.effectId, langId);

    return effect;
  }

  @ResolveField(() => Audio, { nullable: true })
  async audio(@Parent() action: Action): Promise<Audio> {
    if (!action.audioId) return null;
    const audio = await this.prisma.contentAudio.findUnique({
      where: {
        id: action.audioId,
      },
    });

    return audio;
  }

  @ResolveField(() => Profile)
  profile(@Parent() action: Action) {
    return this.prisma.profile.findUnique({
      where: {
        ownerId: action.userId,
      },
    });
  }

  @ResolveField(() => [Profile])
  async followedBy(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Parent() action: Action,
  ): Promise<Profile[]> {
    const myFollowings = await this.prisma.follow.findMany({
      where: {
        followerUserId: user.id,
      },
    });

    const actionUserFollowers = await this.prisma.follow.findMany({
      where: {
        followingUserId: action.userId,
      },
    });

    // get mutual followers
    const actionUserFollowersIds = actionUserFollowers.map((v) => v.id);
    const sharedFollowers = myFollowings.filter((v) =>
      actionUserFollowersIds.includes(v.id),
    );

    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetUserMostInteractionersMessage,
      GetUserMostInteractionersMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.ANALYTICS_MESSAGES.getBulkUserMostInteractioners(),
      new GetUserMostInteractionersMessage({
        pagination: {
          page: 1,
          take: 6,
        },
        userId: action.userId,
        usersWithin: sharedFollowers.map((v) => v.followerUserId),
      }),
    );

    if (!data) {
      return [];
    }

    const profiles = await this.prisma.profile.findMany({
      where: {
        id: {
          in: data.users.map((v) => v.id),
        },
      },
    });

    return profiles;
  }

  async streamToBuffer(stream: Readable): Promise<Buffer> {
    const chunks: Buffer[] = [];

    return new Promise<Buffer>((resolve, reject) => {
      stream.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      stream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });

      stream.on('error', (error: Error) => {
        reject(error);
      });
    });
  }
}
