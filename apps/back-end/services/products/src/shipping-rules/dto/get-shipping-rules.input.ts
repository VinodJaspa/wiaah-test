import { InputType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetShippingRulesInput extends GqlPaginationInput {}
