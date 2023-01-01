export class GetUserDataQuery {
  constructor(public id: string) {}
}

export type GetUserDataQueryRes = {
  email: string;
  name: string;
  id: string;
};
