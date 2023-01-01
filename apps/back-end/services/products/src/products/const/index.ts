import { BuyerToProductActionsType } from '@products/types';
import { ProductStatus as PrismaProductStatus } from '@prisma-client';
export const BuyerToProductActions: Record<
  BuyerToProductActionsType,
  BuyerToProductActionsType
> = {
  purchase: 'purchase',
  vendor_external_click: 'vendor_external_click',
};

export const PRODUCT_SERVICE_KEY = 'product';

export const ProductStatus = PrismaProductStatus;
