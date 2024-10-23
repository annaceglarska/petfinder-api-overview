export interface DataContainer<T, K = any, M = Record<string, string | boolean | number> | undefined> {
  status: DataLoadingStatus;
  value: T | null;
  error?: K;
  queryParams?: M;
}

export type DataLoadingStatus = "ready" | "pending" | "failed";
