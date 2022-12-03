import { MembershipPriceType } from '@membership/types';
import { MembershipType, MembershipUnitType } from 'prismaClient';

export const MembershipPricesType: Record<
  MembershipPriceType,
  MembershipPriceType
> = {
  turnover: 'turnover',
  vendor_site_click: 'vendor_site_click',
};

export const MEMBERSHIP: string = 'membership';

export const membershipType: Record<MembershipType, MembershipType> = {
  monthly: 'monthly',
  per_unit: 'per_unit',
};

export const membershipUnitType: Record<
  MembershipUnitType,
  MembershipUnitType
> = {
  vendor_site_click: 'vendor_site_click',
};
