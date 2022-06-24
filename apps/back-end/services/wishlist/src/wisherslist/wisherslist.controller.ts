import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { WisherslistService } from './wisherslist.service';
import { CreatWisherListPayload } from 'nest-dto';

@Controller()
export class WisherslistController {
  constructor(private readonly wishersService: WisherslistService) {}

  @MessagePattern(KAFKA_EVENTS.createWishersList)
  createWishersList(@Payload() payload: { value: CreatWisherListPayload }) {
    this.wishersService.createWisherList(payload.value.itemId);
  }
}
