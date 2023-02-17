import { UserPreferedLang } from 'nest-utils';

export class IncrementProductVendorSiteCountCommand {
  constructor(
    public readonly productId: string,
    public lang?: UserPreferedLang,
  ) {}
}
