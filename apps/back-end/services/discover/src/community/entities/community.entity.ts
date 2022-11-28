import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class NewsfeedPost {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Action {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
export class Community {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  type: string;

  @Field(() => NewsfeedPost, { nullable: true })
  newsfeed: NewsfeedPost;

  @Field(() => Action, { nullable: true })
  action: Action;
}
