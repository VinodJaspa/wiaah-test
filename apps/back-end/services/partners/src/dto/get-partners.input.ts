import { InputType } from '@nestjs/graphql';
import { PaginationDataInput } from 'nest-utils';

@InputType()
export class GetPartnersInput extends PaginationDataInput {}
