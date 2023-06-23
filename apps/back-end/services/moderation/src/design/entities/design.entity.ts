import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { DesignType } from 'prismaClient';

registerEnumType(DesignType, { name: 'DesignType' });

@ObjectType()
export class Design {
  @Field(() => ID)
  id: string;

  @Field(() => [String])
  placement: string;

  @Field(() => String)
  src: string;

  @Field(() => String)
  distenation: string;

  @Field(() => String)
  name: string;

  @Field(() => DesignType)
  type: DesignType;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
