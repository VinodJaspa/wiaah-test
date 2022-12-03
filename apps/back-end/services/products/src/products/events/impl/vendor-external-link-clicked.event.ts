import { AuthorizationDecodedUser } from 'nest-utils';

export class VendorExternalLinkClickedEvent {
  constructor(
    public readonly productId: string,
    public readonly productSellerId: string,
    public readonly clickedBy?: AuthorizationDecodedUser,
  ) {}
}
