import { Product } from '@prisma-client';
import { UpdateProductInput } from '@products/dto';

export class ProductUpdatedEvent {
  constructor(
    public readonly input: UpdateProductInput,
    public readonly prod: Product,
  ) {}
}
