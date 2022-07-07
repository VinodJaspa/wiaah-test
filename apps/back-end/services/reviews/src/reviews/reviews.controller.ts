import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_MESSAGES, SERVICES } from 'nest-utils';

@Controller()
export class ReviewsController implements OnModuleInit {
  constructor(
    @Inject(SERVICES.REVIEWS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}
  async onModuleInit() {
    this.eventsClient.subscribeToResponseOf(KAFKA_MESSAGES.productReviewable);
    await this.eventsClient.connect();
  }
}
