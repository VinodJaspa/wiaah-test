import { ResourceNotFoundPublicError } from 'nest-utils';

export class ProductNotFoundException extends ResourceNotFoundPublicError {
  constructor(fieldName: string = 'id') {
    super(`product with the given ${fieldName} was not found`);
  }
}
