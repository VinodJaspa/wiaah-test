import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive("@keys(fields:'id')")
export class Discount {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}
