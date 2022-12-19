import { CreateDesignInput } from './create-design.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateDesignInput extends PartialType(CreateDesignInput) {
  @Field(() => ID)
  id: string;
}
