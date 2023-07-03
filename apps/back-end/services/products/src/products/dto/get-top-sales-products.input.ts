import { Field, InputType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class GetTopSalesProductsByCategoryPaginationInput extends ExtendableGqlPaginationInput {
  @Field(() => String, { nullable: true })
  categoryId?: string;
}
