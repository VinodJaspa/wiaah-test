import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  GqlArgumentsHost,
} from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';

@Resolver(() => Review)
export class ReviewsResolver implements OnModuleInit {
  constructor(
    private readonly reviewsService: ReviewsService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly productsClient: ClientKafka,
  ) {}

  @Query((type) => [Review])
  getAllReviews() {
    return this.reviewsService.getAll();
  }

  @Mutation((type) => Boolean)
  deleteAllReviews() {
    return this.reviewsService.deleteAll();
  }

  @Mutation((type) => Review)
  @UseGuards(GqlAuthorizationGuard)
  ReviewProduct(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('ReviewProductArgs') input: CreateReviewInput,
  ) {
    return this.reviewsService.reviewProduct(user.id, input);
  }

  async onModuleInit() {
    this.productsClient.subscribeToResponseOf(KAFKA_MESSAGES.productReviewable);
    await this.productsClient.connect();
  }
}
