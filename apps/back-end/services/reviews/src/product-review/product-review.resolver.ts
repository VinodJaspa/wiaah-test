import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { ProductReview } from './entities/product-review.entity';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import {
  accountType,
  AddToDate,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import {
  DeleteProductReviewCommand,
  ReviewProductCommand,
} from '@product-review/commands';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ReviewProductType } from './const';
import { GetMyReviewsInput, UpdateProductReviewInput } from './dto';
import { PrismaService } from '../Prisma.service';
import { Account, Product } from './entities';
import { GetAdminFitleredProductReviewsInput } from './dto/get-admin-filtered-product-reviews.input';
import { Prisma } from '@prisma-client';

@Resolver(() => ProductReview)
export class ProductReviewResolver implements OnModuleInit {
  constructor(
    @Inject(SERVICES.REVIEWS_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly commandbus: CommandBus,
    private prisma: PrismaService,
  ) {}

  @Query(() => [ProductReview])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async adminGetFilteredProductReviews(
    @Args('args') args: GetAdminFitleredProductReviewsInput,
  ) {
    const filters: Prisma.ProductReviewWhereInput[] = [];

    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }

    if (args.review) {
      filters.push({
        message: {
          contains: args.review,
        },
      });
    }

    if (args.rating) {
      filters.push({
        AND: [
          {
            rate: {
              gte: Math.floor(args.rating),
            },
          },
          {
            rate: {
              lte: Math.floor(args.rating) + 1,
            },
          },
        ],
      });
    }

    if (args.dateAdded) {
      filters.push({
        AND: [
          {
            createdAt: {
              gte: new Date(new Date(args.dateAdded).setHours(0)),
            },
          },
          {
            createdAt: {
              lte: AddToDate(new Date(new Date(args.dateAdded).setHours(0)), {
                days: 1,
              }),
            },
          },
        ],
      });
    }

    const res = await this.prisma.productReview.findMany({
      where: {
        AND: filters,
      },
    });
    console.log({ res });
    return res;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async adminDeleteProductReview(@Args('id') id: string) {
    try {
      await this.prisma.productReview.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async adminUpdateProductReview(@Args('args') args: UpdateProductReviewInput) {
    try {
      await this.prisma.productReview.update({
        where: {
          id: args.id,
        },
        data: args,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Query(() => [ProductReview])
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  getMyProductReviews(
    @Args('args') args: GetMyReviewsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const { skip, take } = ExtractPagination(args.pagination);
    return this.prisma.productReview.findMany({
      where: {
        sellerId: user.id,
      },
      skip,
      take,
    });
  }

  @Query(() => ProductReview)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async adminGetProductReviewById(@Args('id') id: string) {
    const res = await this.prisma.productReview.findUnique({
      where: {
        id: id,
      },
    });
    console.log('get review', { id, res });
    return res;
  }

  @Mutation(() => ProductReview)
  reviewProduct(
    @Args('args') args: CreateProductReviewInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<ReviewProductCommand>(
      new ReviewProductCommand(args, user.id),
    );
  }

  @Mutation(() => ProductReview)
  removeReview(
    @Args('id', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<DeleteProductReviewCommand>(
      new DeleteProductReviewCommand(id, user.id),
    );
  }
  async onModuleInit() {
    this.eventClient.subscribeToResponseOf(
      KAFKA_MESSAGES.REVIEW_SERVICE.getIsUserPurchasedProduct(
        ReviewProductType,
      ),
    );
    this.eventClient.subscribeToResponseOf(
      KAFKA_MESSAGES.REVIEW_SERVICE.getProductSellerId,
    );
    await this.eventClient.connect();
  }

  @ResolveField(() => Account, { nullable: true })
  reviewer(@Parent() review: ProductReview) {
    return {
      __typename: 'Account',
      id: review.reviewerId,
    };
  }

  @ResolveField(() => Product, { nullable: true })
  product(@Parent() review: ProductReview) {
    return {
      __typename: 'Product',
      id: review.productId,
    };
  }
}
