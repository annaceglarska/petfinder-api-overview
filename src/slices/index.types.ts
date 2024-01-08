export interface DataContainer<T> {
  status: DataLoadingStatus;
  value: T | null;
}
export type DataLoadingStatus = "ready" | "pending" | "failed";
