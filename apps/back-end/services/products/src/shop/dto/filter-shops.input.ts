import { Field, InputType, IntersectionType, OmitType } from '@nestjs/graphql';
import { TargetGenders, StoreType, BusinessType } from '@prisma-client';
import { GqlCursorPaginationInput, GqlPaginationInput } from 'nest-utils';

@InputType()
export class FilteredShopsInput {
  @Field(() => String, { nullable: true })
  searchQuery?: string;

  @Field(() => String, { nullable: true })
  locationQuery?: string;

  @Field(() => String, { nullable: true })
  categoryQuery: string;

  @Field((type) => StoreType, { nullable: true })
  storeType?: StoreType;

  @Field((type) => BusinessType, { nullable: true })
  businessType?: BusinessType;

  @Field((type) => TargetGenders, { nullable: true })
  targetGender?: TargetGenders;

  @Field((type) => String, { nullable: true })
  country?: string;

  @Field((type) => String, { nullable: true })
  city?: string;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}

@InputType()
export class FilteredShopsCursorInput extends IntersectionType(
  GqlCursorPaginationInput,
  OmitType(FilteredShopsInput, ['pagination']),
) {}
