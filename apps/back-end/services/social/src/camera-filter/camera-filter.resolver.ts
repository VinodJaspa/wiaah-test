import { Resolver, Query, Args } from '@nestjs/graphql';
import {
  CameraFilter,
  CameraFiltersCursorResponse,
} from './entities/camera-filter.entity';
import { PrismaService } from 'prismaService';
import { GetCameraFiltersInput } from './dto/get-camera-filters.input';

@Resolver(() => CameraFilter)
export class CameraFilterResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => CameraFiltersCursorResponse)
  async getCameraFilters(
    @Args('args') args: GetCameraFiltersInput,
  ): Promise<CameraFiltersCursorResponse> {}
}
