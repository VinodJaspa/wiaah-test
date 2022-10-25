import { Resolver, Query, Args } from '@nestjs/graphql';
import { VehicleService } from '@vehicle-service';
import { PrismaService } from 'prismaService';

@Resolver(() => VehicleService)
export class ServicesSearchEngineResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => VehicleService)
  async getAutoCompelete(@Args('query') query: string) {
    const res = await this.prisma.vehicleService.aggregateRaw({
      pipeline: [
        {
          $search: {
            index: 'location',
            text: {
              query,
              path: {
                wildcard: '*',
              },
              fuzzy: {
                maxEdits: 2,
              },
            },
          },
        },
      ],
    });
    console.log(res);
    return res;
  }
}
