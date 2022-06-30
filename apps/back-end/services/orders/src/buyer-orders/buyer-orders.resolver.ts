import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BuyerOrdersService } from './buyer-orders.service';
import { BuyerOrder } from './entities/buyer-order.entity';
import { CreateBuyerOrderInput } from './dto/create-buyer-order.input';
import { UpdateBuyerOrderInput } from './dto/update-buyer-order.input';

@Resolver(() => BuyerOrder)
export class BuyerOrdersResolver {
  constructor(private readonly buyerOrdersService: BuyerOrdersService) {}

  @Mutation(() => BuyerOrder)
  createBuyerOrder(
    @Args('createBuyerOrderInput') createBuyerOrderInput: CreateBuyerOrderInput,
  ) {
    return this.buyerOrdersService.create(createBuyerOrderInput);
  }

  @Query(() => [BuyerOrder], { name: 'buyerOrders' })
  findAll() {
    return this.buyerOrdersService.findAll();
  }

  @Query(() => BuyerOrder, { name: 'buyerOrder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.buyerOrdersService.findOne(id);
  }

  @Mutation(() => BuyerOrder)
  updateBuyerOrder(
    @Args('updateBuyerOrderInput') updateBuyerOrderInput: UpdateBuyerOrderInput,
  ) {
    return this.buyerOrdersService.update(
      updateBuyerOrderInput.id,
      updateBuyerOrderInput,
    );
  }

  @Mutation(() => BuyerOrder)
  removeBuyerOrder(@Args('id', { type: () => Int }) id: number) {
    return this.buyerOrdersService.remove(id);
  }
}
