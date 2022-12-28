export class GetServiceDataQuery {
  constructor(public id: string, public userId: string) {}
}

export type GetServiceDataQueryRes = {
  name: string;
} | null;
