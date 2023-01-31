import { Profile } from '@entities';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Block {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  blockedUserId: string;

  @Field(() => Date)
  blockedAt: Date;

  @Field(() => Profile, { nullable: true })
  blockedProfile?: Profile;
}
