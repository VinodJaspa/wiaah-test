export interface BalanceRecordData {
  dateAdded: string;
  orderId: string;
  type: string;
  amount: number;
  currency: string;
  recipient: string;
  quantity: number;
  transactionStatus: TransactionStatusEnum;
}

export type TransactionStatusEnum = "completed" | "failed" | "pending";
