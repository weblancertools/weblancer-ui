import { Weblancer } from '@weblancer-ui/manager-registry';
import { getTestWrapper } from '@weblancer-ui/test';
import { AdjustmentManager } from '../adjustment-manager';
import { act, renderHook } from '@testing-library/react';
import { useAdjustmentVersion } from '../hooks/useAdjustmentVersion';
import { IAdjustmentManagerActions } from '../types';

describe('useAdjustmentVersion hook', () => {
  beforeEach(() => {
    Weblancer.clear();
  });

  it('update the version', () => {
    const { result } = renderHook(() => useAdjustmentVersion(), {
      wrapper: getTestWrapper({ requiredManagers: [AdjustmentManager] }),
    });

    const adjustmentManager =
      Weblancer.getManagerInstance<IAdjustmentManagerActions>(
        AdjustmentManager
      );

    act(() => {
      adjustmentManager.setDraggingItemId('test1');
      adjustmentManager.setHoveredContainerId('test2');
    });

    const version1 = result.current;

    act(() => {
      adjustmentManager.setScrollUpdated();
      adjustmentManager.setHoveredContainerId('test3');
    });

    expect(result.current).not.toBe(version1);
  });
});
