import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { DesignPlacement, DesignType } from 'prismaClient';

@InputType()
class input {
  @Field(() => DesignPlacement)
  placement: DesignPlacement;

  @Field(() => String)
  name: string;

  @Field(() => DesignType)
  type: DesignType;
}

@InputType()
export class AdminGetDesignsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
