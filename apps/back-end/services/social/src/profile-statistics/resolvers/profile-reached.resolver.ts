import { ObjectType, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';

@ObjectType()
export class ProfileReached {}

@Resolver(() => ProfileReached)
export class ProfileReachedResolver {
  constructor(private readonly prisma: PrismaService) {}
}
