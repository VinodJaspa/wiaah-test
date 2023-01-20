import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { ServiceStatus, ServiceType } from 'prismaClient';

@InputType()
class Input {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  sellerName: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => Float)
  price: number;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

  @Field(() => String)
  updatedAt: string;
}

@InputType()
export class GetFilteredServicesAdminInput extends PartialType(Input) {
  @Field(() => ServiceType)
  type: ServiceType;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
