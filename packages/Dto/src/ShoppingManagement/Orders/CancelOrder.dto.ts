export interface CancelOrderDto {
  orderId: string;
  cancelationReason: string;
  get: "money" | "credit";
  for: "full" | "partial";
  amount?: number;
}
