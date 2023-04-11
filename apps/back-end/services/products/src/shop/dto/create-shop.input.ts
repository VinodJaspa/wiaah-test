import { InputType, Field, Float, PartialType } from '@nestjs/graphql';
import {
  BusinessType,
  ServiceType,
  ShopPaymentMethods,
  ShopStatus,
  StoreType,
  TargetGenders,
  TypeOfSeller,
} from '@prisma-client';
import { CreateInputGqlTranslationInputField } from 'nest-utils';

@InputType()
export class TranslationTextInput extends CreateInputGqlTranslationInputField(
  String,
) {}

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

  @Field((typpe) => String)
  city: string;

  @Field((type) => String)
  state: string;
}

@InputType()
export class VatSettingsInput {
  @Field(() => String)
  VatID: string;

  @Field(() => LocationInput)
  location: LocationInput;
}

@InputType()
export class VatSettingsPartialInput extends PartialType(VatSettingsInput) {}

@InputType()
export class CreateShopInput {
  @Field((type) => [TranslationTextInput])
  name: TranslationTextInput[];

  @Field(() => String)
  banner: string;

  @Field(() => [TranslationTextInput])
  description: TranslationTextInput[];

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

  @Field((type) => [TargetGenders])
  targetGenders: TargetGenders[];

  @Field(() => VatSettingsPartialInput, { nullable: true })
  vat?: VatSettingsPartialInput;

  @Field(() => TypeOfSeller)
  type_of_seller: TypeOfSeller;

  @Field(() => ShopStatus)
  status: ShopStatus;

  @Field(() => [ShopPaymentMethods])
  payment_methods: ShopPaymentMethods[];

  @Field(() => ServiceType, { nullable: true })
  type: ServiceType;

  @Field(() => [String])
  vidoes: string[];

  @Field(() => [String])
  images: string[];

  @Field(() => String)
  metaTagDescription: string;

  @Field(() => [String])
  metaTagKeywords: string[];

  @Field(() => [String])
  hashtags: string[];
}
