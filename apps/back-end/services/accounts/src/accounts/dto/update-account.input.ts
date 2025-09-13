import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { CreateSellerAccountInput } from './create-account.input';
import { Field, ID, InputType, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(
  OmitType(CreateSellerAccountInput, [
    'password',
    'confirmPassword',
    'email',
    'accountType',
  ]),
) {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  lang?: string;

  @Field(() => String, { nullable: true })
  currency?: string;

  @Field(() => String, { nullable: true })
  country?: string;
  @Field(() => GraphQLUpload, { nullable: true })
  photo?: string;
  @Field(() => Date, { nullable: true })
  birthDate?: string;
}

@InputType()
export class UpdateSellerAccountAdminInput extends PartialType(
  OmitType(CreateSellerAccountInput, ['confirmPassword']),
) {
  @Field(() => ID)
  id: string;
}
