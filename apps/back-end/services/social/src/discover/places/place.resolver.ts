import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { Place } from './entities/place.entity';

@Resolver()
export class PlaceResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Place)
  getPlace(@Args('name') name: string) {
    return {};
  }
}
