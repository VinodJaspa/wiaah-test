import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { ProductCategoryStatus } from '@prisma-client';

@InputType()
export class CreateCategoryInput {
  @Field(() => ID, { nullable: true })
  parantId?: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => ProductCategoryStatus)
  status: ProductCategoryStatus;
}
