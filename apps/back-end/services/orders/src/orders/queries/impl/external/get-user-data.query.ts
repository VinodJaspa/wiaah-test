export class GetUserDataQuery {
  constructor(public id: string) {}
}

export type GetUserDataQueryRes = {
  name: string;
  email: string;
  preferedCurrency: string;
};
