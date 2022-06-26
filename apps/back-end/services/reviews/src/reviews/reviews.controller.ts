import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_MESSAGES, SERVICES } from 'nest-utils';

@Controller()
export class ReviewsController implements OnModuleInit {
  constructor(
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly productsClient: ClientKafka,
  ) {}
  async onModuleInit() {
    this.productsClient.subscribeToResponseOf(KAFKA_MESSAGES.productReviewable);
    await this.productsClient.connect();
  }
}
