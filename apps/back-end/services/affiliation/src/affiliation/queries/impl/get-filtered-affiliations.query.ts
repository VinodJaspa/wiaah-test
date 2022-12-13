import { GetFilteredAffiliationsInput } from '@affiliation/dto';
import { Affiliation } from '@affiliation/entities';

export class GetFilteredAffiliationsQuery {
  constructor(public readonly input: GetFilteredAffiliationsInput) {}
}

export type GetFilteredAffiliationsQueryRes = Affiliation[];
