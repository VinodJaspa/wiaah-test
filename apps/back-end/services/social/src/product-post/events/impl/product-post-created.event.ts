import { ProductPost } from 'prismaClient';

export class ProductPostCreatedEvent {
  constructor(public readonly post: ProductPost) {}
}
