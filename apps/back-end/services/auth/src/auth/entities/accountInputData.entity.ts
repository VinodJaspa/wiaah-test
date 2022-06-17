import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Registeration } from './regiseration.entity';

@ObjectType()
export class AccountInputData {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  password: string;
}
