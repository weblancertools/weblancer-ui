import { Weblancer } from '@weblancer-ui/manager-registry';
import { WeblancerContextProvider } from '@weblancer-ui/test';
import { act, render } from '@testing-library/react';
import { ComponentManager } from '../component-manager';
import { IComponentManagerActions } from '../types';
import { PageManager } from '@weblancer-ui/page-manager';
import { WeblancerText } from '../examples/Text';
import React from 'react';
import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { CreateItemAction } from '../actions/CreateItemAction';
import {
  IPropManagerActions,
  IPropManagerStoreRootState,
  PropManager,
} from '@weblancer-ui/prop-manager';

describe('component manager test', () => {
  const componentKey = 'test-component';

  beforeEach(() => {
    Weblancer.clear();

    Weblancer.registerComponent(componentKey, WeblancerText, {
      componentMetadata: {
        isContainer: false,
        dragging: {
          restrictedMovementAxises: ['x'],
        },
      },
    });

    render(
      <WeblancerContextProvider<IPropManagerStoreRootState>
        requiredManagers={[ComponentManager, PageManager]}
      />
    );
  });

  it('constructor', () => {
    expect(() => {
      Weblancer.getManagerInstance(ComponentManager);
    }).not.toThrow();
  });

  it('register component and access', () => {
    const componentManager =
      Weblancer.getManagerInstance<IComponentManagerActions>(ComponentManager);

    expect(componentManager.getComponentByKey(componentKey)).toBeDefined();
    expect(componentManager.getComponentHolderByKey(componentKey).key).toBe(
      componentKey
    );
  });

  it('create Item and undo test', async () => {
    jest.spyOn(PropManager.prototype, 'getComponent').mockReturnValueOnce({
      componentKey: 'page',
      id: 'page1',
      name: 'page1',
      parentId: 'none',
      props: {},
      children: [],
    });

    EditorAction.getActionInstance(CreateItemAction)
      .prepare(componentKey, 'page1', { x: 0, y: 0 })
      .perform();

    const propManager =
      Weblancer.getManagerInstance<IPropManagerActions>(PropManager);

    const allComponents1 = propManager.getComponentMap();
    expect(Object.values(allComponents1)).toHaveLength(1);
    expect(Object.values(allComponents1)[0].parentId).toBe('page1');

    act(() => {
      const undoManager =
        Weblancer.getManagerInstance<IUndoManagerActions>(UndoManager);

      undoManager.undo();
    });

    const allComponents2 = propManager.getComponentMap();
    expect(Object.values(allComponents2)).toHaveLength(0);
  });

  it('getMetaData', () => {
    jest.spyOn(PropManager.prototype, 'getComponent').mockReturnValueOnce({
      componentKey: componentKey,
      id: 'test1',
      name: 'test1',
      parentId: 'page1',
      props: {},
      children: [],
    });

    const componentManager =
      Weblancer.getManagerInstance<IComponentManagerActions>(ComponentManager);

    const metadata = componentManager.getMetadata('test1');

    expect(metadata).toBeDefined();
    expect(metadata?.dragging?.restrictedMovementAxises).toHaveLength(1);
    expect(metadata?.dragging?.restrictedMovementAxises).toContain('x');
  });
});
