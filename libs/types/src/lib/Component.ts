import { IComponentMetadata } from './IComponentMetadata';
import { IContainerProps } from './IContainerProps';
import { IComponentData, IWeblancerComponentProps } from './PropManager';

export type WeblancerComponent =
  | React.ComponentType<IWeblancerComponentProps>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ComponentType<IWeblancerComponentProps & any>
  | React.ComponentType<IWeblancerComponentProps & IContainerProps>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ComponentType<IWeblancerComponentProps & IContainerProps & any>;

export interface IComponentRegisterMetadata {
  label?: string;
  categories?: string | string[];
  groups?: string | string[];
  componentMetadata?: IComponentMetadata;
  defaultComponentData?: Partial<Pick<IComponentData, 'props' | 'children'>>;
}

export interface IComponentMap {
  [componentName: string]: IComponentHolder;
}

export interface IComponentHolder {
  key: string;
  component: WeblancerComponent;
  metadata?: IComponentRegisterMetadata;
}
