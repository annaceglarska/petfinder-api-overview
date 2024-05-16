export interface DataContainer<T, K = any> {
  status: DataLoadingStatus;
  value: T | null;
  error?: K;
}

export type DataLoadingStatus = "ready" | "pending" | "failed";
