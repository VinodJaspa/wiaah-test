export class GetServiceQuery {
  constructor(public id: string, public type: string) {}
}

export type GetServiceQueryRes = {
  id: string;
  sellerId: string;
  insuranceAmount: number;
};
