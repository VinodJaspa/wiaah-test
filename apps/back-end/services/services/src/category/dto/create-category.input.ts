import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ServiceCategoryFilterValueInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  sortOrder: number;
}

@InputType()
export class ServiceCategoryFilterInput {
  @Field(() => String)
  filterGroupName: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => [ServiceCategoryFilterValueInput])
  filterValues: ServiceCategoryFilterValueInput[];
}

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => [ServiceCategoryFilterInput])
  filters: ServiceCategoryFilterInput[];
}
