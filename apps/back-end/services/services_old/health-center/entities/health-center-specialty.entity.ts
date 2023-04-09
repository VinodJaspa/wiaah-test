import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Doctor } from './health-center-doctor.entity';

@ObjectType()
export class HealthCenterSpecialty {
  @Field(() => ID)
  id: string;

  @Field(() => [Doctor], { nullable: true })
  doctors?: Doctor[];

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
