import { Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { GqlCursorPaginationInput } from 'nest-utils';

export enum EffectSearchTerm {
  recommended = 'recommended',
  new = 'new',
  cateogry = 'category',
}

registerEnumType(EffectSearchTerm, { name: 'EffectSearchTerm' });

@InputType()
export class GetTopEffectsInput extends GqlCursorPaginationInput {
  @Field(() => EffectSearchTerm)
  effetSearchTerm: EffectSearchTerm;

  @Field(() => ID, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  search?: string;
}
