import { ObjectType, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';

@ObjectType()
export class ProfileEngaged {}

@Resolver(() => ProfileEngaged)
export class ProfileEngagedResolver {
  constructor(private readonly prisma: PrismaService) {}
}
