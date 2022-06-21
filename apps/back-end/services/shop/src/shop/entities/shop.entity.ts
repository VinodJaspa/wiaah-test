import {
  ObjectType,
  Field,
  Int,
  ID,
  Float,
  registerEnumType,
  Directive,
} from '@nestjs/graphql';
import { StoreType, TargetGenders, VendorType } from '@prisma-client';

registerEnumType(StoreType, { name: 'StoreType' });
registerEnumType(VendorType, { name: 'VendorType' });
registerEnumType(TargetGenders, { name: 'TargetGenders' });

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
@Directive('@key(fields: "name")')
export class Shop {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => Location)
  location: Location;

  @Field((type) => String)
  ownerId: string;

  @Field((type) => [StoreType])
  storeType: StoreType[];

  @Field((type) => [VendorType])
  vendorType: VendorType[];

  @Field((type) => [TargetGenders])
  targetGenders: TargetGenders[];

  @Field((type) => String)
  createdAt: string;

  @Field((type) => String)
  updatedAt: string;
}
