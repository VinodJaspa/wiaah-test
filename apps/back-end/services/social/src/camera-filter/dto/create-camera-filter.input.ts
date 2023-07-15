import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCameraFilterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
