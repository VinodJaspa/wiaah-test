import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SERVICES, KafkaMessageHandler, KAFKA_MESSAGES } from 'nest-utils';
import { PrismaService } from 'src/Prisma.service';
import { CreateReviewInput } from './dto/create-review.input';
import { ClientKafka } from '@nestjs/microservices';
import {
  IsProductReviewableMessage,
  IsProductReviewableMessageReply,
} from 'nest-dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly productsClient: ClientKafka,
  ) {}

  getAll() {
    return this.prisma.review.findMany();
  }

  async reviewProduct(
    reviewerId: string,
    reviewInput: CreateReviewInput,
  ): Promise<Review> {
    const { itemId, reviewData } = reviewInput;
    const { isReviewable } = await KafkaMessageHandler<
      string,
      IsProductReviewableMessage,
      IsProductReviewableMessageReply
    >(this.productsClient, KAFKA_MESSAGES.productReviewable, {
      productId: reviewInput.itemId,
      reviewerId,
    });

    if (!isReviewable)
      throw new UnprocessableEntityException(
        'product not found or this product is not legal for review',
      );

    return await this.prisma.review.create({
      data: {
        reviewedItemId: itemId,
        reviewData,
        reviewerId,
      },
      select: {
        id: true,
        reviewData: true,
        reviewedItemId: true,
        reviewerId: true,
      },
    });
  }
  async reviewService(reviewerId: string, reviewInput: CreateReviewInput) {}
}
