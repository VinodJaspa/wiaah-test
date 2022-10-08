import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class ServiceCategoryFilterValue {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  sortOrder: number;
}

@ObjectType()
export class ServiceCategoryFilter {
  @Field(() => String)
  filterGroupName: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ServiceCategoryFilterValue])
  filterValues: ServiceCategoryFilterValue[];
}

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [ServiceCategoryFilter])
  filters: ServiceCategoryFilter[];
}
