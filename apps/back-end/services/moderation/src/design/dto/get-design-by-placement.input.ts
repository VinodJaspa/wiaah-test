import { Field, InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { DesignPlacement } from 'prismaClient';

@InputType()
export class GetDesignByPlacementInput {
  @Field(() => DesignPlacement)
  placement: DesignPlacement;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
