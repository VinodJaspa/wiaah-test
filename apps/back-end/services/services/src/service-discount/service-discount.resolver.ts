import { ServiceDiscount } from '@entities';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { PrismaService } from 'prismaService';

@Resolver(() => ServiceDiscount)
export class ServiceDiscountResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveReference()
  reslove(ref: { __typename: string; id: string }) {
    return {};
  }
}
