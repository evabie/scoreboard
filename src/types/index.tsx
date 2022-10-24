export type DeepNonNullableObject<T> = T extends object
  ? {
      [P in keyof T]-?: DeepNonNullableObject<NonNullable<T[P]>>;
    }
  : NonNullable<T>;
