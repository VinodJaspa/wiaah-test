import { CreateEventSchedulingInput } from './create-event-scheduling.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventSchedulingInput extends PartialType(
  CreateEventSchedulingInput,
) {
  @Field(() => Int)
  id: number;
}
