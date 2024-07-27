import { Resolver } from '@nestjs/graphql';
import { UserInterest } from './entities/user-interest.entity';
import { PrismaService } from 'prismaService';

@Resolver(() => UserInterest)
export class UserInterestResolver {
  constructor(private readonly prisma: PrismaService) { }
}
