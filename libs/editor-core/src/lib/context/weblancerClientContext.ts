import { createContext, useContext } from 'react';

interface IWeblancerClientContext {
  document: Document;
  window: Window;
}

const initialState: IWeblancerClientContext = {
  document: document,
  window: window,
};

export const WeblancerClientContext =
  createContext<IWeblancerClientContext>(initialState);

export const useWeblancerClientContext = () =>
  useContext<IWeblancerClientContext>(WeblancerClientContext);
