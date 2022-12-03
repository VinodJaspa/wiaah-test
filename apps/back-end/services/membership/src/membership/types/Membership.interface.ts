import { Membership, MembershipTurnoverRule } from 'prismaClient';

export type MembershipType = Membership & {
  turnover_rules: MembershipTurnoverRule[];
};

export type MembershipPreformActionType = 'vendor_stie_click';
