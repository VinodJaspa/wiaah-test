import { Field, InputType, Int } from '@nestjs/graphql';
import { VendorType, TargetGenders, StoreType } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class FilteredShopsInput {
  @Field((type) => StoreType, { nullable: true })
  storeType?: StoreType;

  @Field((type) => VendorType, { nullable: true })
  vendorType?: VendorType;

  @Field((type) => TargetGenders, { nullable: true })
  targetGender?: TargetGenders;

  @Field((type) => String, { nullable: true })
  country?: string;

  @Field((type) => String, { nullable: true })
  city?: string;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
