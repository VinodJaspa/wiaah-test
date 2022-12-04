import { Product } from '@prisma-client';
import { UpdateProdutctInput } from '@products/dto';

export class ProductUpdatedEvent {
  constructor(
    public readonly input: UpdateProdutctInput,
    public readonly prod: Product,
  ) {}
}
