import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Service } from './service.entity';

@ObjectType()
class BookingCostService {
  @Field(() => Service)
  service: Service;

  @Field(() => Int)
  qty: number;
}

@ObjectType()
export class BookingCost {
  @Field(() => Float)
  total: number;

  @Field(() => Float)
  subTotal: number;

  @Field(() => Float)
  vatPercent: number;

  @Field(() => Float)
  vatAmount: number;

  @Field(() => Float)
  deposit?: number;

  @Field(() => Float)
  extras?: number;

  @Field(() => [BookingCostService])
  services: BookingCostService[];
}
