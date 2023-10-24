import { WeblancerComponentRoot } from '@weblancer-ui/adjustment-manager';
import {
  ComponentManager,
  IComponentManagerActions,
} from '@weblancer-ui/component-manager';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import {
  IComponentData,
  IDefaultPropData,
  IPropManagerActions,
  PropManager,
} from '@weblancer-ui/prop-manager';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export interface IComponentRenderer {
  itemId: string;
}

export const ComponentRenderer = ({ itemId }: IComponentRenderer) => {
  const propManager = useWeblancerManager<IPropManagerActions>(PropManager);
  const componentManager =
    useWeblancerManager<IComponentManagerActions>(ComponentManager);

  const componentData: IComponentData = useSelector(
    propManager.getComponentPropChangeSelector(itemId)
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

  const children = Object.values(componentData.childrenPropData ?? {});

  return (
    <WeblancerComponentRoot itemId={itemId}>
      <Component defineProp={defineProp}>
        {children.map(({ id: childItemId }) => {
          return <ComponentRenderer key={childItemId} itemId={childItemId} />;
        })}
      </Component>
    </WeblancerComponentRoot>
  );
};
