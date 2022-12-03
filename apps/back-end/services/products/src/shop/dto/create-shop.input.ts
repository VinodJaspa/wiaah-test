import { InputType, Field, Float } from '@nestjs/graphql';
import { StoreType, TargetGenders, VendorType } from '@prisma-client';

@InputType()
export class LocationInput {
  @Field((type) => Float)
  lat: number;

  @Field((type) => Float)
  long: number;

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
}
