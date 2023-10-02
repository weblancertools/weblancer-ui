import { createContext } from 'react';
import { WeblancerManager } from '../weblancerManager/weblancerManager';

interface IWeblancerContext {
  weblancerManager: WeblancerManager;
}

const initialState: IWeblancerContext = {
  weblancerManager: {} as WeblancerManager,
};

const WeblancerContext = createContext<IWeblancerContext>(initialState);

export default WeblancerContext;
