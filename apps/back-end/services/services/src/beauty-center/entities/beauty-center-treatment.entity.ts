import { ServiceDiscount } from '@entities';
import { Directive, Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { BeautyCenterTreatmentCategory } from './beauty-center-treatment-category.entity';

@ObjectType()
@Directive('@key(fields:"id")')
export class Treatment {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  treatmentCategoryId: string;

  @Field(() => BeautyCenterTreatmentCategory, { nullable: true })
  category?: BeautyCenterTreatmentCategory;

  @Field(() => String)
  title: string;

  @Field(() => Float)
  price: number;

  @Field(() => [Int])
  duration: number[];

  @Field(() => ServiceDiscount)
  discount: ServiceDiscount;
}
