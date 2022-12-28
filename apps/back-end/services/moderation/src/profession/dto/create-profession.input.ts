import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { ProfessionStatus } from 'prismaClient';

registerEnumType(ProfessionStatus, { name: 'professionStatus' });

@InputType()
export class CreateProfessionInput {
  @Field(() => String)
  title: string;

  @Field(() => ProfessionStatus)
  status: ProfessionStatus;

  @Field(() => Int)
  sortOrder: number;
}
