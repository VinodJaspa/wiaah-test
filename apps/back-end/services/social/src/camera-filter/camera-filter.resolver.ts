import { Resolver, Query, Args } from '@nestjs/graphql';
import {
  CameraFilter,
  CameraFiltersCursorResponse,
} from './entities/camera-filter.entity';
import { PrismaService } from 'prismaService';
import { GetCameraFiltersInput } from './dto/get-camera-filters.input';
import { CameraFilterService } from './camera-filter.service';
import { GetLang, UserPreferedLang } from 'nest-utils';

@Resolver(() => CameraFilter)
export class CameraFilterResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly service: CameraFilterService,
  ) {}

  @Query(() => CameraFilter)
  async getCameraFilterById(
    @Args('id') id: string,
    @GetLang() langId: UserPreferedLang,
  ): Promise<CameraFilter> {
    const res = await this.prisma.cameraFilter.findUnique({
      where: {
        id,
      },
    });

    return this.service.formatFilter(res, langId);
  }

  @Query(() => CameraFiltersCursorResponse)
  async getCameraFilters(
    @Args('args') args: GetCameraFiltersInput,
    @GetLang() langId: UserPreferedLang,
  ): Promise<CameraFiltersCursorResponse> {
    const filters = await this.prisma.cameraFilter.findMany({
      where: {
        categoryId: args.categoryId,
      },
      orderBy: {
        usage: 'desc',
      },
      cursor: args.cursor
        ? {
            id: args.cursor,
          }
        : undefined,
      take: args.take + 1,
    });

    return {
      data: filters
        .slice(0, args.take)
        .map((filter) => this.service.formatFilter(filter, langId)),
      hasMore: filters.length > args.take,
      cursor: args.cursor,
      nextCursor: filters.at(args.take).id,
    };
  }
}
