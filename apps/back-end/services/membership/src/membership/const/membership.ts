import { MembershipPriceType } from '@membership/types';

export const MembershipPricesType: Record<
  MembershipPriceType,
  MembershipPriceType
> = {
  turnover: 'turnover',
  vendor_site_click: 'vendor_site_click',
};

export const MEMBERSHIP: string = 'membership';
