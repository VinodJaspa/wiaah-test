import { InputType, Field, Float, PartialType } from '@nestjs/graphql';
import {
  StoreType,
  TargetGenders,
  TypeOfSeller,
  VendorType,
} from '@prisma-client';

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
  @Field((type) => String)
  name: string;

  @Field(() => String)
  banner: string;

  @Field(() => String)
  description: string;

  @Field((type) => LocationInput)
  location: LocationInput;

  @Field((type) => [StoreType])
  storeType: StoreType[];

  @Field((type) => [VendorType])
  vendorType: VendorType[];

  @Field((type) => [TargetGenders])
  targetGenders: TargetGenders[];

  @Field(() => TypeOfSeller)
  typeOfSeller: TypeOfSeller;

  @Field(() => VatSettingsPartialInput, { nullable: true })
  vat?: VatSettingsPartialInput;
}
