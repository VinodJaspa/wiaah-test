import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeclineAppointmentInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  reason: string;
}
