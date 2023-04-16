import {
  ObjectType,
  Field,
  ID,
  Float,
  registerEnumType,
  Directive,
  Int,
} from '@nestjs/graphql';
import {
  BusinessType,
  ServiceType,
  ShopPaymentMethods,
  ShopStatus,
  StoreType,
  TargetGenders,
} from '@prisma-client';
import { CreateObjectGqlTranslationInputField } from 'nest-utils';

registerEnumType(StoreType, { name: 'StoreType' });
registerEnumType(TargetGenders, { name: 'TargetGenders' });
registerEnumType(BusinessType, { name: 'BusinessType' });
registerEnumType(ShopStatus, { name: 'ShopStatus' });
registerEnumType(ShopPaymentMethods, { name: 'ShopPaymentMethod' });
registerEnumType(ServiceType, { name: 'ServiceType' });

@ObjectType()
export class TranslationText extends CreateObjectGqlTranslationInputField(
  String,
) {}

@ObjectType()
export class Location {
  @Field((type) => Float)
  lat: number;

  @Field((type) => Float)
  long: number;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  country: string;

  @Field((type) => String)
  city: string;

  @Field((type) => String)
  state: string;

  @Field(() => String)
  postalCode: string;
}

// @ObjectType()
// export class VatSettings {
//   @Field(() => String)
//   VatID: string;

//   @Field(() => Location)
//   location: Location;
// }

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@key(fields: "ownerId")')
@Directive('@key(fields: "name")')
export class Shop {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  ownerId: string;

  @Field((type) => String)
  name: string;

  @Field(() => String)
  banner: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  verified: boolean;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  thumbnail: string;

  @Field((type) => Location)
  location: Location;

  @Field((type) => StoreType)
  storeType: StoreType;

  @Field((type) => BusinessType)
  businessType: BusinessType;

  @Field((type) => [TargetGenders])
  targetGenders: TargetGenders[];

  // @Field(() => VatSettings, { nullable: true })
  // vat?: VatSettings;

  @Field(() => ShopStatus)
  status: ShopStatus;

  @Field(() => [ShopPaymentMethods])
  payment_methods: ShopPaymentMethods[];

  @Field(() => ServiceType, { nullable: true })
  type: ServiceType;

  @Field(() => [String])
  videos: string[];

  @Field(() => [String])
  images: string[];

  @Field(() => Int)
  reviews: number;

  @Field(() => Float)
  rating: number;
}
