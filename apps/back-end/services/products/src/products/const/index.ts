import { BuyerToProductActionsType } from '@products/types';

export const BuyerToProductActions: Record<
  BuyerToProductActionsType,
  BuyerToProductActionsType
> = {
  purchase: 'purchase',
  vendor_external_click: 'vendor_external_click',
};
