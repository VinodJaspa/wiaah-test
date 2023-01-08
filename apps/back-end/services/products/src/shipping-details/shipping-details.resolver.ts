import { Resolver } from '@nestjs/graphql';
import { ShippingDetails } from './entities';

@Resolver(() => ShippingDetails)
export class ShippingDetailsResolver {}
