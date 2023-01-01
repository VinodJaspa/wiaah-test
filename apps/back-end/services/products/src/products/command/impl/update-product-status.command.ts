import { ProductStatus } from '@products/const';

export class UpdateProductStatusCommand {
  constructor(
    public readonly id: string,
    public readonly status: keyof typeof ProductStatus,
  ) {}
}
