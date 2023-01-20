import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from '../profile.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Account {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}
