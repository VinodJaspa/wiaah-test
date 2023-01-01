export class SearchFilteredAffiliationsQuery {
  constructor(
    public readonly filters: {
      commission?: number;
      link?: string;
    },
  ) {}
}

export type SearchFilteredAffiliationsQueryRes = {
  id: string;
}[];
