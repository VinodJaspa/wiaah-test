import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ServiceCategoryFilterValue {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  sortOrder: number;
}

@InputType()
export class ServiceCategoryFilter {
  @Field(() => String)
  filterGroupName: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ServiceCategoryFilterValue])
  filterValues: ServiceCategoryFilterValue[];
}

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => [ServiceCategoryFilter])
  filters: ServiceCategoryFilter[];
}
