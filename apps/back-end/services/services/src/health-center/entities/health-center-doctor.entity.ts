import { TranslationText } from '@entities';
import {
  Field,
  Float,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { HealthCenterDoctorAvailablityStatus } from 'prismaClient';
import { HealthCenterSpecialty } from './health-center-specialty.entity';
import { HealthCenter } from './health-center.entity';

registerEnumType(HealthCenterDoctorAvailablityStatus, {
  name: 'HealthCenterDoctorAvailablityStatus',
});

@ObjectType()
export class HealthCenterDoctor {
  @Field(() => ID)
  id: string;

  @Field(() => HealthCenter, { nullable: true })
  healthCenter?: HealthCenter;

  @Field(() => HealthCenterSpecialty, { nullable: true })
  speciality?: HealthCenterSpecialty;

  @Field(() => ID)
  healthCenterId: string;

  @Field(() => ID)
  specialityId: string;

  @Field(() => Float)
  rating: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  description: string;

  @Field(() => HealthCenterDoctorAvailablityStatus)
  availablityStatus: HealthCenterDoctorAvailablityStatus;
}
