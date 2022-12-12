import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { ServiceStatus, ServiceType } from 'prismaClient';

@InputType()
export class GetFilteredServicesAdminInput {
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

  @Field(() => ServiceType)
  type: ServiceType;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

  @Field(() => String)
  updatedAt: string;
}
