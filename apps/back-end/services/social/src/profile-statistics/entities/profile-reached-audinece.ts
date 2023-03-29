import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProfileReachedGender } from 'prismaClient';

registerEnumType(ProfileReachedGender, { name: 'ProfileReachedGender' });

@ObjectType()
export class ProfileReachedAudience {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  profileId: string;

  @Field(() => ID)
  reachedByProfileId: string;

  @Field(() => ProfileReachedGender)
  gender: ProfileReachedGender;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  createdAt: Date;
}
