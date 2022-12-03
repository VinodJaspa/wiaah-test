import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AccountInputData } from './accountInputData.entity';

@ObjectType()
export class Registeration {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  verificationToken: string;

  @Field((type) => String)
  email: string;

  @Field((type) => AccountInputData)
  accountInputData: AccountInputData;
}
