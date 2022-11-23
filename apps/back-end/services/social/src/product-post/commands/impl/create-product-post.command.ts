import { CreateProductPostInput } from '@product-post/dto';

export class CreateProductPostCommand {
  constructor(
    public readonly input: CreateProductPostInput,
    public readonly userId: string,
  ) {}
}
