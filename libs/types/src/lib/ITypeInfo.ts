export interface ITypeInfo<TValue = unknown> {
  typeName: string;
  subTypeName?: string;
  isRequired?: boolean;
  defaultValue?: TValue;
  properties?: Record<string, ITypeInfo>;
}
