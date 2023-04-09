import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { ServiceType } from 'prismaClient';

registerEnumType(ServiceType, { name: 'ServiceType' });

@ObjectType()
export class ServiceOwnership {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => ID)
  serviceId: string;

  @Field(() => ServiceType)
  serviceType: ServiceType;
}
