import { CreateUsersInteractionInput } from './create-users-interaction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsersInteractionInput extends PartialType(
  CreateUsersInteractionInput,
) {
  @Field(() => Int)
  id: number;
}
