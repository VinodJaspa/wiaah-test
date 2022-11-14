import { BuyerToProductActionsType } from '@products/types';
import { AuthorizationDecodedUser } from 'nest-utils';

export class GetCanPreformBuyerToProductActionQuery {
  constructor(
    public readonly productId: string,
    public readonly action: BuyerToProductActionsType,
    public readonly user?: AuthorizationDecodedUser,
  ) {}
}
