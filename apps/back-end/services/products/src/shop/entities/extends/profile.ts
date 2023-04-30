import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"userId")')
export class Profile {
  @Field(() => ID)
  @Directive('@external')
  userId: string;
}
