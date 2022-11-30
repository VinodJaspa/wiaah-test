import { CreateUserActivityStatInput } from './create-user-activity-stat.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserActivityStatInput extends PartialType(CreateUserActivityStatInput) {
  @Field(() => Int)
  id: number;
}
