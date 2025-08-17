import { InputType, Field, Float, PartialType, registerEnumType, ID } from '@nestjs/graphql';
import {
  BusinessType,
  CollaborationType,
  MemberType,
  ServiceType,
  ShopPaymentMethods,
  ShopStatus,
  StoreFor,
  StoreType,
  TargetGenders,
} from '@prisma-client';
import { CreateInputGqlTranslationInputField, FieldRequired } from 'nest-utils';

@InputType()
export class TranslationTextInput extends CreateInputGqlTranslationInputField(
  String,
) { }

@InputType()
export class LocationInput {
  @Field((type) => Float, { nullable: true })
  lat?: number;

  @Field((type) => Float, { nullable: true })
  long?: number;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  country: string;

  @Field((type) => String)
  countryCode: string;

  @Field((type) => String)
  city: string;

  @Field((type) => String)
  state: string;

  @Field(() => String)
  postalCode: string;
}

registerEnumType(BusinessType, {
  name: 'BusinessType',
});
registerEnumType(CollaborationType, {
  name: 'CollaborationType',
});
registerEnumType(MemberType, {
  name: 'MemberType',
});


@InputType()
export class MemberInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => [MemberType])
  memberType: MemberType[];

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  birthDate?: string; // you can use Date scalar if you prefer

  @Field(() => String, { nullable: true })
  idNumber?: string;

  @Field(() => String, { nullable: true })
  idExpiration?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  state?: string;

  @Field(() => String, { nullable: true })
  postalCode?: string;

  @Field(() => String)
  country: string;
}

@InputType()
export class VatSettingsInput {
  @Field(() => String)
  VatID: string;

  @Field(() => LocationInput)
  location: LocationInput;
}

@InputType()
export class VatSettingsPartialInput extends PartialType(VatSettingsInput) { }

@InputType()
export class CreateShopInput {
  @Field((type) => [TranslationTextInput])
  name: TranslationTextInput[];

  @Field(() => [TranslationTextInput])
  description: TranslationTextInput[];
  @Field(() => [TranslationTextInput])
  companyName: TranslationTextInput[];

  @FieldRequired('storeType', StoreType.product)
  @Field(() => String, { nullable: true })
  storeCategoryId?: string;

  @Field(() => String)
  banner: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  thumbnail: string;

  @Field((type) => LocationInput)
  location: LocationInput;

  @Field((type) => StoreType)
  storeType: StoreType;

  @Field((type) => BusinessType)
  businessType: BusinessType;

  @Field((type) => CollaborationType)
  collaborationType: CollaborationType;

  @Field(() => [MemberInput], { nullable: true })
  members?: MemberInput[];

  @Field(() => [StoreFor])
  storeFor: StoreFor[];

  @Field((type) => [TargetGenders])
  targetGenders: TargetGenders[];

  @Field(() => VatSettingsPartialInput, { nullable: true })
  vat?: VatSettingsPartialInput;

  @Field(() => ShopStatus)
  status: ShopStatus;

  @Field(() => [ShopPaymentMethods])
  payment_methods: ShopPaymentMethods[];

  @FieldRequired('storeType', StoreType.service)
  @Field(() => ServiceType, { nullable: true })
  type: ServiceType;

  @Field(() => [MediaInput], { nullable: true })
  images?: MediaInput[];

  @Field(() => [MediaInput], { nullable: true })
  videos?: MediaInput[];

  @Field(() => [String])
  hashtags?: string[];
}
@InputType()
export class MediaInput {
  @Field()
  src: string;

  @Field()
  type: string;

  @Field()
  asset_id: string;
}