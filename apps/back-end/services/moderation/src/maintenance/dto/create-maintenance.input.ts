import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMaintenanceInput {
  @Field(() => String)
  url: string;

  @Field(() => String)
  from: string;

  @Field(() => String)
  to: string;
}
