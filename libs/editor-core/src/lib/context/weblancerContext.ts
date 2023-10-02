import { createContext, useContext } from 'react';
import { WeblancerManager } from '../weblancerManager/weblancerManager';

interface IWeblancerContext {
  weblancerManager: WeblancerManager;
}

const initialState: IWeblancerContext = {
  weblancerManager: {} as WeblancerManager,
};

const WeblancerContext = createContext<IWeblancerContext>(initialState);

export const useWeblancerContext = () =>
  useContext<IWeblancerContext>(WeblancerContext);

export default WeblancerContext;
