import { Injectable } from '@nestjs/common';
import { CreateBuyerOrderInput } from './dto/create-buyer-order.input';
import { UpdateBuyerOrderInput } from './dto/update-buyer-order.input';

@Injectable()
export class BuyerOrdersService {
  create(createBuyerOrderInput: CreateBuyerOrderInput) {
    return 'This action adds a new buyerOrder';
  }

  findAll() {
    return `This action returns all buyerOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buyerOrder`;
  }

  update(id: number, updateBuyerOrderInput: UpdateBuyerOrderInput) {
    return `This action updates a #${id} buyerOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} buyerOrder`;
  }
}
