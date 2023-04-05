import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncrementProductVendorSiteCountCommand } from '@products/command/impl';
import { Product } from '@products/entities';
import { ProductRepository } from '@products/repository';

@CommandHandler(IncrementProductVendorSiteCountCommand)
export class IncrementProductVendorSiteCountCommandHandler
  implements ICommandHandler<IncrementProductVendorSiteCountCommand>
{
  constructor(private readonly productrepo: ProductRepository) {}

  async execute({
    productId,
    lang = 'en',
  }: IncrementProductVendorSiteCountCommand): Promise<Product> {
    // return this.productrepo.update(productId, {
    //   vendor_external_link_clicks: {
    //     increment: 1,
    //   },
    // });
    return this.productrepo.getProduct(productId, lang);
  }
}
