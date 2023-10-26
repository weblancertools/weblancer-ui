import { createContext, useContext } from 'react';
import { noop } from 'lodash';

interface IWeblancerClientContext {
  getManager: <TType>(_class: unknown) => TType;
  document: Document;
  window: Window;
}

const initialState: IWeblancerClientContext = {
  getManager: noop as never,
  document: document,
  window: window,
};

export const WeblancerClientContext =
  createContext<IWeblancerClientContext>(initialState);

export const useWeblancerClientContext = () =>
  useContext<IWeblancerClientContext>(WeblancerClientContext);
