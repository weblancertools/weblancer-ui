type OmitBy<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = OmitBy<T, K> &
  Partial<Pick<T, K>>;
