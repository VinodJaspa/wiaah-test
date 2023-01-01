import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShippingAddress } from './entities/shipping-address.entity';
import { CreateShippingAddressInput } from './dto/create-shipping-address.input';
import { UpdateShippingAddressInput } from './dto/update-shipping-address.input';

@Resolver(() => ShippingAddress)
export class ShippingAddressResolver {
  constructor() {}
}
