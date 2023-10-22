import { createContext, useContext } from 'react';
import { noop } from 'lodash';

interface IWeblancerClientContext {
  getManager: <TType>(_class: unknown) => TType;
}

const initialState: IWeblancerClientContext = {
  getManager: noop as never,
};

const WeblancerClientContext =
  createContext<IWeblancerClientContext>(initialState);

export const useWeblancerClientContext = () =>
  useContext<IWeblancerClientContext>(WeblancerClientContext);

export default WeblancerClientContext;
