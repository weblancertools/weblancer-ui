import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import {
  IComponentData,
  IPropManagerActions,
  PropManager,
} from '@weblancer-ui/prop-manager';
import { IInspectorComponentProps } from '../../../types';
import { useSelector } from 'react-redux';
import { useBreakpointManagerSelector } from '@weblancer-ui/breakpoint-manager';
import { InspectorManager } from '../../../inspector-manager';
import { PropTypes } from '@weblancer-ui/types';

export const String = ({ itemId, propName }: IInspectorComponentProps) => {
  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);

  const componentData: IComponentData = useSelector(
    propManager.getComponentPropChangeSelector(itemId)
  );

  const currentBreakpointId = useBreakpointManagerSelector(
    (state) => state.BreakpointManager.currentBreakpoint.id
  );

  const value = componentData.props[propName][currentBreakpointId]
    .value as string;

  return <input value={value}></input>;
};

InspectorManager.addInspector({
  key: PropTypes.String,
  node: String,
});
