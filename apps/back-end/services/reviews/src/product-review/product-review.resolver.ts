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
import { GetMyReviewsInput } from './dto';
import { PrismaService } from '../Prisma.service';
import { Account, Product } from './entities';

@Resolver(() => ProductReview)
export class ProductReviewResolver implements OnModuleInit {
  constructor(
    @Inject(SERVICES.REVIEWS_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly commandbus: CommandBus,
    private prisma: PrismaService,
  ) {}

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

  @ResolveField(() => Account)
  reviewer(@Parent() review: ProductReview) {
    return {
      __typename: 'Account',
      id: review.reviewerId,
    };
  }

  @ResolveField(() => Product)
  product(@Parent() review: ProductReview) {
    return {
      __typename: 'Product',
      id: review.productId,
    };
  }
}
