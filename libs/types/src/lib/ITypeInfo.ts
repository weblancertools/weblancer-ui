export interface ITypeInfo {
  typeName: string;
  isRequired?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  properties?: ITypeInfo[]; // Change 'props' to 'properties'
}
