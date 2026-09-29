export type PayoutBatchStatus = "draft" | "processing" | "completed" | "failed";

export interface PayoutBatch {
  id: string;
  batchNumber: string;
  totalAmountNgn: number;
  courierCount: number;
  status: PayoutBatchStatus;
  createdAt: string;
  processedAt?: string;
  authorizedByAdminId?: string;
}

export interface CodReconciliationItem {
  id: string;
  shipmentId: string;
  courierId: string;
  amountCollectedNgn: number;
  remitted: boolean;
  remittedAt?: string;
}
