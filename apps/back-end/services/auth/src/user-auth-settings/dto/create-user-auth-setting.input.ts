import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserAuthSettingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
