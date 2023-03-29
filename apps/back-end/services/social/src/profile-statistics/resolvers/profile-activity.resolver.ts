import { ObjectType, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';

@ObjectType()
export class ProfileActivity {}

@Resolver(() => ProfileActivity)
export class ProfileActivityResolver {
  constructor(private readonly prisma: PrismaService) {}
}
