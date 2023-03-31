import {
  ObjectType,
  Field,
  Int,
  ID,
  Float,
  registerEnumType,
  Directive,
} from '@nestjs/graphql';
import { BusinessType, StoreType, TargetGenders } from '@prisma-client';

registerEnumType(StoreType, { name: 'StoreType' });
registerEnumType(TargetGenders, { name: 'TargetGenders' });
registerEnumType(BusinessType, { name: 'BusinessType' });

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
}

@ObjectType()
export class VatSettings {
  @Field(() => String)
  VatID: string;

  @Field(() => Location)
  location: Location;
}

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@key(fields: "ownerId")')
@Directive('@key(fields: "name")')
export class Shop {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  ownerId: string;

  @Field((type) => Location)
  location: Location;

  @Field(() => String)
  description: string;

  @Field(() => String)
  banner: string;

  @Field(() => Boolean)
  verified: boolean;

  @Field((type) => [StoreType])
  storeType: StoreType[];

  @Field((type) => BusinessType)
  businessType: BusinessType;

  @Field((type) => [TargetGenders])
  targetGenders: TargetGenders[];

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field(() => VatSettings, { nullable: true })
  vat?: VatSettings;
}
