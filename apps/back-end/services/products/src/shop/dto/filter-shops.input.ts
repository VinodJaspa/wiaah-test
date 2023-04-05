import { Field, InputType, Int } from '@nestjs/graphql';
import { TargetGenders, StoreType, BusinessType } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class FilteredShopsInput {
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
