import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { WisherslistService } from './wisherslist.service';
import {
  CreatWisherListPayload,
  KafkaPayload,
  NewProductCreatedEvent,
} from 'nest-dto';

@Controller()
export class WisherslistController {
  constructor(private readonly wishersService: WisherslistService) {}

  @MessagePattern(KAFKA_EVENTS.PRODUCTS_EVENTS.productCreated)
  createWishersList(@Payload() payload: KafkaPayload<NewProductCreatedEvent>) {
    this.wishersService.createWisherList(payload.value.input.id);
  }
}
