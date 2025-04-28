export class GetServiceDataQuery {
  constructor(
    public readonly id: string,
    public readonly type: string,
  ) {}
}

export type GetServiceDataQueryRes = {
  id: string;
  sellerId: string;
  insuranceAmount: number;
} | null;
