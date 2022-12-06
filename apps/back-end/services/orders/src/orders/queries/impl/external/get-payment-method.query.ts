export class GetPaymentMethodQuery {
  constructor(public readonly id: string) {}
}

export type GetPaymentMethodQueryRes = {
  type: string;
  value: string;
} | null;
