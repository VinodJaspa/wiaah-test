import { CreatePinnedContentInput } from './create-pinned-content.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePinnedContentInput extends PartialType(CreatePinnedContentInput) {
  @Field(() => Int)
  id: number;
}
