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

  it('construct', () => {
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

    act(() => {
      const adjustmentManager =
        Weblancer.getManagerInstance<IAdjustmentManagerActions>(
          AdjustmentManager
        );

      adjustmentManager.setHoveredContainerId('test');
    });

    expect(result.current).toBe('test');
  });
});
