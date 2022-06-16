import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Registeration } from './regiseration.entity';

@ObjectType()
export class AccountInputData {
  @Field((type) => ID)
  id: string;

  @Field((type) => Registeration)
  registeration: Registeration;

  @Field((type) => String)
  registerationId: string;

  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;
}
