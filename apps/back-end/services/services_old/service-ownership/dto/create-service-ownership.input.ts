import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateServiceOwnershipInput {
  @Field(() => ID)
  ownerId: string;

  @Field(() => ID)
  serviceId: string;
}
