import { Field, InputType } from '@nestjs/graphql';
import { ServicePresentationType } from 'prismaClient';

@InputType()
export class ServicePresentationInput {
  @Field(() => ServicePresentationType)
  type: ServicePresentationType;

  @Field(() => String)
  src: string;
}
