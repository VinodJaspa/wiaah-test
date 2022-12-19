import { InputType, Int, Field } from '@nestjs/graphql';
import { DesignType } from 'prismaClient';

@InputType()
export class CreateDesignInput {
  @Field(() => [String])
  placement: string;

  @Field(() => String)
  src: string;

  @Field(() => String)
  name: string;

  @Field(() => DesignType)
  type: DesignType;
}
