import { CreateSellerAccountInput } from './create-account.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(CreateSellerAccountInput) {}
