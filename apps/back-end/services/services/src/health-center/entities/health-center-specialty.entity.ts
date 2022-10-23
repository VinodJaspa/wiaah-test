import { Field, ID, ObjectType } from '@nestjs/graphql';
import { HealthCenterDoctor } from './health-center-doctor.entity';

@ObjectType()
export class HealthCenterSpecialty {
  @Field(() => ID)
  id: string;

  @Field(() => [HealthCenterDoctor], { nullable: true })
  doctors?: HealthCenterDoctor[];

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
