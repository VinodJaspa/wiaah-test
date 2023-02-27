import {
  Resolver,
  Field,
  Args,
  Parent,
  Query,
  ResolveField,
} from '@nestjs/graphql';
import { Country } from './entities/country.entity';
import { PrismaService } from 'prismaService';
import { City } from './entities/city.entity';

@Resolver(() => Country)
export class CountryResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Country])
  getCountries(@Args('name') name: string): Promise<Country[]> {
    return this.prisma.country.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  @ResolveField(() => [City])
  cities(@Parent() country: Country) {
    return this.prisma.city.findMany({
      where: {
        countryId: country.id,
      },
    });
  }
}
