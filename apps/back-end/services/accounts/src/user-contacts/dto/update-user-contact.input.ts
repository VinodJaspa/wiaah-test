import { CreateUserContactInput } from './create-user-contact.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserContactInput extends PartialType(CreateUserContactInput) {
  @Field(() => Int)
  id: number;
}
