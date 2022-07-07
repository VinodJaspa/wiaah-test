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
    @Inject(SERVICES.REVIEWS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  getAll() {
    return this.prisma.review.findMany();
  }

  deleteAll() {
    return this.prisma.review.deleteMany();
  }

  async reviewProduct(
    reviewerId: string,
    reviewInput: CreateReviewInput,
  ): Promise<Review> {
    const { itemId, reviewData } = reviewInput;
    const {
      results: { data: isReviewable, error, success },
    } = await KafkaMessageHandler<
      string,
      IsProductReviewableMessage,
      IsProductReviewableMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.productReviewable,
      new IsProductReviewableMessage({ productId: itemId, reviewerId }),
      'product reviewable check timed out',
    );
    if (!success) throw new UnprocessableEntityException(error);

    if (!isReviewable)
      throw new UnprocessableEntityException(
        'this item is not legal for review',
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
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async reviewService(reviewerId: string, reviewInput: CreateReviewInput) {}
}
