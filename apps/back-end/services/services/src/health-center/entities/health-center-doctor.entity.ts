import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
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
  healthCenter: HealthCenter;

  @Field(() => [HealthCenterSpecialty])
  speciality: HealthCenterSpecialty[];

  @Field(() => ID)
  healthCenterId: string;

  @Field(() => ID)
  specialtyId: string;

  @Field(() => HealthCenterDoctorAvailablityStatus)
  availablityStatus: HealthCenterDoctorAvailablityStatus;
}
