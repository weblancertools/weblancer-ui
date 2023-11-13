import { createContext, useContext } from 'react';
import { IEditorUIPlugin } from '@weblancer-ui/types';
import { noop } from 'lodash';

interface IWeblancerContext {
  getPlugins: () => IEditorUIPlugin[];
}

const initialState: IWeblancerContext = {
  getPlugins: noop as never,
};

export const WeblancerContext = createContext<IWeblancerContext>(initialState);

export const useWeblancerEditor = () =>
  useContext<IWeblancerContext>(WeblancerContext);
