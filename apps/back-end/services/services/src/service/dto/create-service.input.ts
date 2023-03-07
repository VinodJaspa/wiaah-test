import { InputType, Int, Field } from '@nestjs/graphql';
import { ServiceType } from 'prismaClient';

@InputType()
export class CreateServiceInput {
  @Field(() => ServiceType)
  type: ServiceType;
}
