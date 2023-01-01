import { CreateProfessionInput } from './create-profession.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProfessionInput extends PartialType(CreateProfessionInput) {
  @Field(() => ID)
  id: string;
}
