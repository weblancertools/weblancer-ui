import { createContext, useContext } from 'react';
import { IEditorUIPlugin } from '@weblancer-ui/types';
import { noop } from 'lodash';
import { EditorAction } from '@weblancer-ui/undo-manager';

interface IWeblancerContext {
  getManager: <TType>(_class: unknown) => TType;
  getPlugins: () => IEditorUIPlugin[];
  callEditorAction: (action: EditorAction) => void;
}

const initialState: IWeblancerContext = {
  getManager: noop as never,
  getPlugins: noop as never,
  callEditorAction: noop as never,
};

export const WeblancerContext = createContext<IWeblancerContext>(initialState);

export const useWeblancerContext = () =>
  useContext<IWeblancerContext>(WeblancerContext);
