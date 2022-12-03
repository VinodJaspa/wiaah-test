export class Account {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  accountType: 'buyer' | 'seller';
}
