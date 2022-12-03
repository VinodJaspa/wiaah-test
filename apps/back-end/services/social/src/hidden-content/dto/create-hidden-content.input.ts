import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class HideContentInput {
  @Field(() => ID)
  id: string;
}
