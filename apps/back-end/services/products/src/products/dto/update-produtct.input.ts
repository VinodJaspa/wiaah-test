import { CreateProductInput } from './create-produtct.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProdutctInput extends PartialType(CreateProductInput) {
  @Field(() => ID)
  id: string;
}
