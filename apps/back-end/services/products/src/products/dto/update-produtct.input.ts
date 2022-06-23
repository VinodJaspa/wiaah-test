import { CreateProdutctInput } from './create-produtct.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProdutctInput extends PartialType(CreateProdutctInput) {
  @Field(() => Int)
  id: number;
}
