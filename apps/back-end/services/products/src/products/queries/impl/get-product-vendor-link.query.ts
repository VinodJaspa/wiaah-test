import { AuthorizationDecodedUser } from 'nest-utils';

export class GetProductVendorLinkQuery {
  constructor(
    public productId: string,
    public user?: AuthorizationDecodedUser,
  ) {}
}
