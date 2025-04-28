export class GetProductMetadataQuery {
  constructor(
    public id: string,
    public userId: string,
  ) {}
}

export type GetProductMetadataQueryRes = {
  keywords: string[];
};
