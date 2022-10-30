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
@Directive('@key(fields: "id, name, ownerId")')
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

  @Field((type) => [VendorType])
  vendorType: VendorType[];

  @Field((type) => [TargetGenders])
  targetGenders: TargetGenders[];

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
