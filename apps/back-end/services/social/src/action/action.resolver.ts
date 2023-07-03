import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  Action,
  ActionEffect,
  GetActionsCursorResponse,
} from '@action/entities';
import { CreateActionInput, GetUserActionsInput } from '@action/dto';
import {
  AuthorizationDecodedUser,
  BadMediaFormatPublicError,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  InternalServerPublicError,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { CreateActionCommand } from '@action/commands';
import { GetActionByIdQuery, GetUserActionsQuery } from '@action/queries';
import { UploadService } from '@wiaah/upload';
import { GraphQLUpload, Upload } from 'graphql-upload';
import { PrismaService } from 'prismaService';
import { Profile } from '@entities';
import { ActionTopHashtagResponse } from './entities/action-hashtag';
import { Readable } from 'stream';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { ObjectId } from 'mongodb';
import { GetActionByAudioIdInput } from './dto/getActionByAudioId.dto';

@Resolver(() => Action)
export class ActionResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
    private readonly uploadService: UploadService,
    private readonly prisma: PrismaService,
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

    const action = await actionPromise;
    const cover = await coverPromise;

    if (!this.uploadService.mimetypes.videos.all.includes(action.mimeType))
      throw new BadMediaFormatPublicError();

    if (!this.uploadService.mimetypes.image.all.includes(cover.mimeType))
      throw new BadMediaFormatPublicError();

    await this.commandbus.execute<CreateActionCommand, Action>(
      new CreateActionCommand(
        {
          actionCoverSrc: cover.src,
          actionSrc: action.src,
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
    const _res = await this.prisma.actionAudio.create({
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

  @ResolveField(() => ActionEffect)
  async effect(@Parent() action: Action): Promise<ActionEffect> {
    // TODO: get effect by id (action.effectId)
    return {
      name: 'effect name',
    };
  }

  @ResolveField(() => Profile)
  profile(@Parent() action: Action) {
    return this.prisma.profile.findUnique({
      where: {
        ownerId: action.userId,
      },
    });
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
