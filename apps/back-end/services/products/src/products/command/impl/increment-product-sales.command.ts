import { UserPreferedLang } from 'nest-utils';

export class IncrementProductSalesCommand {
  constructor(
    public readonly productId: string,
    public lang?: UserPreferedLang,
  ) {}
}
