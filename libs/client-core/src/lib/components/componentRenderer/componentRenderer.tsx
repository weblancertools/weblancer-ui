import {
  ComponentManager,
  IComponentManagerActions,
} from '@weblancer-ui/component-manager';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { WeblancerComponentRoot } from '../weblancerComponentRoot/weblancerComponentRoot';
import { IComponentData, IDefaultPropData } from '@weblancer-ui/types';
import { LocalContextWrapper } from './LocalContextWrapper';

export interface IComponentRenderer {
  itemId: string;
  [key: string]: unknown;
}

export const ComponentRenderer = ({ itemId, ...rest }: IComponentRenderer) => {
  const propManager = useWeblancerManager<IPropManagerActions>(PropManager);
  const componentManager =
    useWeblancerManager<IComponentManagerActions>(ComponentManager);

  const componentData: IComponentData = useSelector(
    propManager.getComponentChangeSelector(itemId)
  );

  const Component = componentManager.getComponentByKey(
    componentData.componentKey
  );

  const defineProp = useCallback(
    <TPropType,>(propData: IDefaultPropData<TPropType>) => {
      return propManager.defineComponentProp(itemId, propData);
    },
    [itemId, propManager]
  );

  const children = Object.values(componentData.children ?? {});

  return (
    <LocalContextWrapper itemId={itemId}>
      <WeblancerComponentRoot itemId={itemId} defineProp={defineProp}>
        <Component defineProp={defineProp} itemId={itemId} {...rest}>
          {children.length > 0 &&
            children.map((childItemId) => {
              return (
                <ComponentRenderer key={childItemId} itemId={childItemId} />
              );
            })}
        </Component>
      </WeblancerComponentRoot>
    </LocalContextWrapper>
  );
};
