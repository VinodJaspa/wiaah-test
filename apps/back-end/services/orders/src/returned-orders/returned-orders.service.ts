import { Injectable } from '@nestjs/common';
import { CreateReturnedOrderInput } from './dto/create-returned-order.input';
import { UpdateReturnedOrderInput } from './dto/update-returned-order.input';

@Injectable()
export class ReturnedOrdersService {
  create(createReturnedOrderInput: CreateReturnedOrderInput) {
    return 'This action adds a new returnedOrder';
  }

  findAll() {
    return `This action returns all returnedOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} returnedOrder`;
  }

  update(id: number, updateReturnedOrderInput: UpdateReturnedOrderInput) {
    return `This action updates a #${id} returnedOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} returnedOrder`;
  }
}
