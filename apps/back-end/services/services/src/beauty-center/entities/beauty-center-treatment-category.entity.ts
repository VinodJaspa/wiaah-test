import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BeautyCenterTreatmentCategory {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  createdById: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  title: string;
}
