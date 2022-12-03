import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { ProductReview } from './entities/product-review.entity';
import { CreateProductReviewInput } from './dto/create-product-review.input';
import {
  AuthorizationDecodedUser,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import {
  DeleteProductReviewCommand,
  ReviewProductCommand,
} from '@product-review/commands';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ReviewProductType } from './const';

@Resolver(() => ProductReview)
export class ProductReviewResolver implements OnModuleInit {
  constructor(
    @Inject(SERVICES.REVIEWS_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly commandbus: CommandBus,
  ) {}

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
}
