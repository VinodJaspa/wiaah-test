import { CreateCameraFilterInput } from './create-camera-filter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCameraFilterInput extends PartialType(
  CreateCameraFilterInput,
) {
  @Field(() => Int)
  id: number;
}
