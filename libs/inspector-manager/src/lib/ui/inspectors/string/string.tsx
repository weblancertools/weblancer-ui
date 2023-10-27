import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { IInspectorComponentProps } from '../../../types';
import { useSelector } from 'react-redux';
import { InspectorManager } from '../../../inspector-manager';
import { PropTypes } from '@weblancer-ui/types';
import { useCallback } from 'react';

export const String = ({ itemId, propName }: IInspectorComponentProps) => {
  const propManager =
    useWeblancerEditorManager<IPropManagerActions>(PropManager);

  const value: string = useSelector(
    propManager.getComponentPropChangeSelector(itemId, propName)
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      propManager.updateComponentProp(itemId, propName, newValue);
    },
    [itemId, propName, propManager]
  );

  return <input value={value} onChange={handleChange}></input>;
};

InspectorManager.addInspector({
  key: PropTypes.String,
  node: String,
});
