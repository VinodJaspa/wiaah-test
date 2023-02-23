import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { DesignPlacement, DesignType } from 'prismaClient';

registerEnumType(DesignPlacement, { name: 'DesignPlacement' });

@InputType()
export class CreateDesignInput {
  @Field(() => [DesignPlacement])
  placement: DesignPlacement[];

  @Field(() => String)
  src: string;

  @Field(() => String)
  name: string;

  @Field(() => DesignType)
  type: DesignType;
}
