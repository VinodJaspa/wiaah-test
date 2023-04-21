import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Action, GetActionsCursorResponse } from '@action/entities';
import { CreateActionInput, GetUserActionsInput } from '@action/dto';
import {
  AuthorizationDecodedUser,
  BadMediaFormatPublicError,
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
import { ContentHostType } from 'prismaClient';

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
        type: ContentHostType.action,
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

    if (!src) throw new InternalServerPublicError();

    const Res = await this.prisma.mediaUpload.create({
      data: {
        src: res[0]?.src,
        userId: user.id,
        type: ContentHostType.action,
        mimeType: file.mimetype,
      },
    });

    return Res.id;
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

  @Query(() => [Action])
  getAction(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<GetActionByIdQuery>(
      new GetActionByIdQuery(id, user.id),
    );
  }
}
