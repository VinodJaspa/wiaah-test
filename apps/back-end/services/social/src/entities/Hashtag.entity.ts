import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"tag")')
export class Hashtag {
  @Field(() => String)
  @Directive('@external')
  tag: string;
}
