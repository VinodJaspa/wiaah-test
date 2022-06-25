import { CreateProdutctInput } from './create-produtct.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProdutctInput extends PartialType(CreateProdutctInput) {
  @Field(() => ID)
  id: string;
}
