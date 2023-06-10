import { Field, ObjectType } from '@nestjs/graphql';
import { Action } from './action.entity';

@ObjectType()
export class ActionTopHashtagResponse {
  @Field(() => Action, { nullable: true })
  viewed?: Action;
  @Field(() => Action, { nullable: true })
  liked?: Action;
  @Field(() => Action, { nullable: true })
  shared?: Action;
  @Field(() => Action, { nullable: true })
  commented?: Action;
}
