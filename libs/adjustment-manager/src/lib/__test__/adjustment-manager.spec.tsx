import { Weblancer } from '@weblancer-ui/manager-registry';
import { EditorTestProvider, getTestWrapper } from '@weblancer-ui/test';
import { AdjustmentManager } from '../adjustment-manager';
import {
  AdjustmentManagerService,
  IAdjustmentManagerActions,
  useAdjustmentManagerSelector,
} from '../types';
import { renderHook, act, render } from '@testing-library/react';
import { useRef } from 'react';

describe('adjustment manager test', () => {
  beforeEach(() => {
    Weblancer.clear();
  });

  it('constructor', () => {
    render(<EditorTestProvider requiredManagers={[AdjustmentManager]} />);

    expect(() => {
      Weblancer.getManagerInstance(AdjustmentManager);
    }).not.toThrow();
  });

  it('add item root', () => {
    render(<EditorTestProvider requiredManagers={[AdjustmentManager]} />);

    const adjustmentManager =
      Weblancer.getManagerInstance<IAdjustmentManagerActions>(
        AdjustmentManager
      );

    const { result } = renderHook(() =>
      useRef<HTMLDivElement>(document.createElement('div'))
    );

    act(() => {
      adjustmentManager.addItemRootRef('test', result.current);
    });

    expect(adjustmentManager.getItemRootRef('test')).toBeDefined();
  });

  it('set hovered container', async () => {
    const { result } = renderHook(
      () =>
        useAdjustmentManagerSelector(
          (state) => state[AdjustmentManagerService].hoveredContainerId
        ),
      {
        wrapper: getTestWrapper({ requiredManagers: [AdjustmentManager] }),
      }
    );

    expect(result.current).toBeUndefined();

    const adjustmentManager =
      Weblancer.getManagerInstance<IAdjustmentManagerActions>(
        AdjustmentManager
      );

    act(() => {
      adjustmentManager.setHoveredContainerId('test');
    });

    expect(adjustmentManager.getHoveredContainerId()).toBe('test');
    expect(result.current).toBe('test');
  });

  it('set mouse over', async () => {
    const { result } = renderHook(
      () =>
        useAdjustmentManagerSelector(
          (state) => state[AdjustmentManagerService].mouseOverItemId
        ),
      {
        wrapper: getTestWrapper({ requiredManagers: [AdjustmentManager] }),
      }
    );

    expect(result.current).toBeUndefined();

    const adjustmentManager =
      Weblancer.getManagerInstance<IAdjustmentManagerActions>(
        AdjustmentManager
      );

    act(() => {
      adjustmentManager.setMouseOverItemId('test');
    });

    expect(adjustmentManager.getMouseOverItemId()).toBe('test');
    expect(result.current).toBe('test');
  });

  it('set selected item', async () => {
    const { result } = renderHook(
      () =>
        useAdjustmentManagerSelector(
          (state) => state[AdjustmentManagerService].selectedItemId
        ),
      {
        wrapper: getTestWrapper({ requiredManagers: [AdjustmentManager] }),
      }
    );

    expect(result.current).toBeUndefined();

    const adjustmentManager =
      Weblancer.getManagerInstance<IAdjustmentManagerActions>(
        AdjustmentManager
      );

    act(() => {
      adjustmentManager.setSelectedItemId('test');
    });

    expect(adjustmentManager.getSelectedItemId()).toBe('test');
    expect(result.current).toBe('test');
  });

  it('set scroll updated', async () => {
    const { result } = renderHook(
      () =>
        useAdjustmentManagerSelector(
          (state) => state[AdjustmentManagerService].scrollHash
        ),
      {
        wrapper: getTestWrapper({ requiredManagers: [AdjustmentManager] }),
      }
    );

    expect(result.current).toBeUndefined();

    const adjustmentManager =
      Weblancer.getManagerInstance<IAdjustmentManagerActions>(
        AdjustmentManager
      );

    act(() => {
      adjustmentManager.setScrollUpdated();
    });

    expect(result.current).toBeDefined();
  });
});
