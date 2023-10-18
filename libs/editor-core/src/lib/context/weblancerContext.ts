import { createContext, useContext } from 'react';
import { IEditorUIPlugin } from '@weblancer-ui/types';
import { noop } from 'lodash';

interface IWeblancerContext {
  getManager: <TType>(_class: unknown) => TType;
  getPlugins: () => IEditorUIPlugin[];
}

const initialState: IWeblancerContext = {
  getManager: noop as never,
  getPlugins: noop as never,
};

const WeblancerContext = createContext<IWeblancerContext>(initialState);

export const useWeblancerContext = () =>
  useContext<IWeblancerContext>(WeblancerContext);

export default WeblancerContext;
