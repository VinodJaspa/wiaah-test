import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountVerification {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => ID)
  userId: string;

  @Field(() => Boolean)
  compeleted: boolean;

  @Field(() => Boolean)
  accepted: boolean;

  @Field(() => ID, { nullable: true })
  acceptedById?: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  knownAs: string;

  @Field(() => ID)
  categoryId: string;

  @Field(() => String)
  idPhoto: string;
}
