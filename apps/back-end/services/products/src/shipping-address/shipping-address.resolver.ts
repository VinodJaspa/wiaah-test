import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddress } from './entities/shipping-address.entity';
import { CreateShippingAddressInput } from './dto/create-shipping-address.input';
import { UpdateShippingAddressInput } from './dto/update-shipping-address.input';

@Resolver(() => ShippingAddress)
export class ShippingAddressResolver {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  @Mutation(() => ShippingAddress)
  createShippingAddress(@Args('createShippingAddressInput') createShippingAddressInput: CreateShippingAddressInput) {
    return this.shippingAddressService.create(createShippingAddressInput);
  }

  @Query(() => [ShippingAddress], { name: 'shippingAddress' })
  findAll() {
    return this.shippingAddressService.findAll();
  }

  @Query(() => ShippingAddress, { name: 'shippingAddress' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.shippingAddressService.findOne(id);
  }

  @Mutation(() => ShippingAddress)
  updateShippingAddress(@Args('updateShippingAddressInput') updateShippingAddressInput: UpdateShippingAddressInput) {
    return this.shippingAddressService.update(updateShippingAddressInput.id, updateShippingAddressInput);
  }

  @Mutation(() => ShippingAddress)
  removeShippingAddress(@Args('id', { type: () => Int }) id: number) {
    return this.shippingAddressService.remove(id);
  }
}
