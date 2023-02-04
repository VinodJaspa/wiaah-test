import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { Discount } from '@products';
import { PrismaService } from 'prismaService';

@Resolver(() => Discount)
export class DiscountResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveReference()
  reslove(ref: { __typename: string; id: string }) {
    return this.prisma.discount.findUnique({
      where: {
        id: ref.id,
      },
    });
  }
}
