export interface ITypeInfo<TValue = unknown> {
  typeName: string;
  isRequired?: boolean;
  defaultValue?: TValue;
  properties?: ITypeInfo[];
}
