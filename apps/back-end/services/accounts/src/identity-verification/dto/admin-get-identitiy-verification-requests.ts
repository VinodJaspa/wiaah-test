import { InputType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class AdminGetIdentitiyVerificationRequestsInput extends ExtendableGqlPaginationInput {}
