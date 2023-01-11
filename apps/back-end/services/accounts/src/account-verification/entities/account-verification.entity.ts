import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AccountVerificationStatus } from '@prisma-client';

registerEnumType(AccountVerificationStatus, {
  name: 'AccountVerificationStatus',
});

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

  @Field(() => AccountVerificationStatus)
  status: AccountVerificationStatus;

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
