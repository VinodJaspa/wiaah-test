import { TranslationTextInput } from '@dto';
import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { HealthCenterDoctorAvailablityStatus } from 'prismaClient';

@InputType()
export class HealthCenterDoctorInput {
  @Field(() => ID)
  specialityId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => Float)
  price: number;

  @Field(() => [TranslationTextInput])
  description: TranslationTextInput[];

  @Field(() => HealthCenterDoctorAvailablityStatus)
  availablityStatus: HealthCenterDoctorAvailablityStatus;
}
