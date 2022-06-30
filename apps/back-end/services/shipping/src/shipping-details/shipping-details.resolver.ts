import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { ShippingDetailsService } from './shipping-details.service';
import { ShippingDetails } from './entities/shipping-detail.entity';

@Resolver(() => ShippingDetails)
export class ShippingDetailsResolver {
  constructor(
    private readonly shippingDetailsService: ShippingDetailsService,
  ) {}

  @ResolveReference()
  resolveShippingDetails(ref: {
    __typename: string;
    country: string;
    shippingRulesIds: string[];
  }): Promise<ShippingDetails> {
    if (
      !ref.country ||
      !ref.shippingRulesIds ||
      !Array.isArray(ref.shippingRulesIds)
    )
      return null;
    return this.shippingDetailsService.getShippingDetials(
      ref.shippingRulesIds,
      ref.country,
    );
  }
}
