export type TRequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
