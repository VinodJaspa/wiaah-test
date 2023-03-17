import { TranslationTextInput } from '@dto';
import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { HealthCenterDoctorAvailablityStatus } from 'prismaClient';
import { GraphQLUpload, Upload } from 'graphql-upload';

@InputType()
export class HealthCenterDoctorInput {
  @Field(() => ID)
  specialityId: string;

  @Field(() => String)
  name: string;

  @Field(() => GraphQLUpload)
  thumbnail: Upload;

  @Field(() => Float)
  price: number;

  @Field(() => [TranslationTextInput])
  description: TranslationTextInput[];

  @Field(() => HealthCenterDoctorAvailablityStatus)
  availablityStatus: HealthCenterDoctorAvailablityStatus;
}
