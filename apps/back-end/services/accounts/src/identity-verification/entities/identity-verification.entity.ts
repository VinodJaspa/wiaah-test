import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class IdentityVerification {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => ID)
  userId: string;

  @Field(() => Boolean)
  completed: boolean;

  @Field(() => Boolean)
  accepted: boolean;

  @Field(() => ID)
  acceptedById: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  fullAddress: string;

  @Field(() => Date)
  dateOfBirth: Date;

  @Field(() => String)
  id_front: string;

  @Field(() => String)
  id_back: string;

  @Field(() => String)
  VVCPicture: string;

  @Field(() => String)
  VVC: string;
}
