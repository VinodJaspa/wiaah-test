import { CreateProfileStatisticInput } from './create-profile-statistic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileStatisticInput extends PartialType(CreateProfileStatisticInput) {
  @Field(() => Int)
  id: number;
}
