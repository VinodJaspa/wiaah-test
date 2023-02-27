import {
  Args,
  Field,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { GetCititesInput } from './dto/get-citites-input';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';

@Resolver(() => City)
export class CityResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [City])
  getCitites(@Args('args') args: GetCititesInput): Promise<Country[]> {
    return this.prisma.city.findMany({
      where: {
        AND: [
          {
            name: {
              contains: args.name,
            },
          },
          {
            countryId: args.countryid,
          },
        ],
      },
    });
  }

  @ResolveField(() => Country)
  country(@Parent() parent: City) {
    return this.prisma.country.findUnique({
      where: {
        id: parent.countryId,
      },
    });
  }
}
