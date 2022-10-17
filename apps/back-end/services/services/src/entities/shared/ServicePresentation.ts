import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ServicePresentationType } from 'prismaClient';

registerEnumType(ServicePresentationType, { name: 'ServicePresentationType' });

@ObjectType()
export class ServicePresentation {
  @Field(() => ServicePresentationType)
  type: ServicePresentationType;

  @Field(() => String)
  src: string;
}
