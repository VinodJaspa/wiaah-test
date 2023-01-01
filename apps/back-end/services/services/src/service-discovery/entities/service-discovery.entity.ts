import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ServiceStatus, ServiceType } from 'prismaClient';

@ObjectType()
export class ServiceDiscovery {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  sellerName: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => [Float])
  price: [number, number];

  @Field(() => ServiceType)
  type: ServiceType;

  @Field(() => ServiceStatus)
  status: ServiceStatus;

  @Field(() => String)
  updatedAt: string;
}
