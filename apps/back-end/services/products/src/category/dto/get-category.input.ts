import { InputType } from '@nestjs/graphql';
import { GqlCursorPaginationInput } from 'nest-utils';

@InputType()
export class GetProductCategoriesCursorPaginationInput extends GqlCursorPaginationInput {}
