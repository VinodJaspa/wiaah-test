import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class ProductFilterGroupValue {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  sortOrder: number;
}

@ObjectType()
export class Filter {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [ProductFilterGroupValue])
  values: ProductFilterGroupValue[];

  @Field(() => Int)
  sortOrder: number;
}
