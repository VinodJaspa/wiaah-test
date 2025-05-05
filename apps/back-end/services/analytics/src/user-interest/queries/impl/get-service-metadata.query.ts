export class GetServiceMetadataQuery {
  constructor(
    public serviceId: string,
    public userId: string,
  ) {}
}

export type GetServiceMetadataQueryRes = {
  keywords: string[];
};
