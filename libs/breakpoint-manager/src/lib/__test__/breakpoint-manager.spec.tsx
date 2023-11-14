import { Weblancer } from '@weblancer-ui/manager-registry';
import { UnitTestProvider, getTestWrapper } from '@weblancer-ui/test';
import { renderHook, act, render } from '@testing-library/react';
import { BreakpointManager } from '../breakpoint-manager';
import {
  IBreakpointManagerActions,
  useBreakpointManagerSelector,
} from '../types';
import { generateRandomString } from '@weblancer-ui/utils';
import { BreakpointManagerService } from '../constants';

describe('breakpoint manager test', () => {
  beforeEach(() => {
    Weblancer.clear();
  });

  it('constructor', () => {
    render(<UnitTestProvider requiredManagers={[BreakpointManager]} />);

    expect(() => {
      Weblancer.getManagerInstance(BreakpointManager);
    }).not.toThrow();
  });

  it('set breakpoint', () => {
    const { result } = renderHook(
      () =>
        useBreakpointManagerSelector(
          (state) => state[BreakpointManagerService].breakpoints
        ),
      {
        wrapper: getTestWrapper({ requiredManagers: [BreakpointManager] }),
      }
    );

    const breakpointManager =
      Weblancer.getManagerInstance<IBreakpointManagerActions>(
        BreakpointManager
      );

    const id = generateRandomString(8);

    act(() => {
      breakpointManager.addBreakpoint({
        id,
        bottom: 1500,
      });
    });

    expect(result.current[id].bottom).toBe(1500);
  });

  it('set current breakpoint', () => {
    const { result } = renderHook(
      () =>
        useBreakpointManagerSelector(
          (state) => state[BreakpointManagerService].currentBreakpoint
        ),
      {
        wrapper: getTestWrapper({ requiredManagers: [BreakpointManager] }),
      }
    );

    const breakpointManager =
      Weblancer.getManagerInstance<IBreakpointManagerActions>(
        BreakpointManager
      );

    act(() => {
      breakpointManager.setCurrentBreakpoint(700);
    });

    expect(result.current.id).toBe('small');

    act(() => {
      breakpointManager.setCurrentBreakpoint(900);
    });

    expect(result.current.id).toBe('medium');
  });

  it('remove breakpoint', () => {
    const { result } = renderHook(
      () =>
        useBreakpointManagerSelector(
          (state) => state[BreakpointManagerService].breakpoints
        ),
      {
        wrapper: getTestWrapper({ requiredManagers: [BreakpointManager] }),
      }
    );

    const breakpointManager =
      Weblancer.getManagerInstance<IBreakpointManagerActions>(
        BreakpointManager
      );

    expect(Object.keys(result.current).length).toBe(3);

    const id = Object.keys(result.current)[0];

    act(() => {
      breakpointManager.removeBreakpoint(id);
    });

    expect(result.current[id]).toBeUndefined();
    expect(Object.keys(result.current).length).toBe(2);
  });

  it('update breakpoint', () => {
    const { result } = renderHook(
      () =>
        useBreakpointManagerSelector(
          (state) => state[BreakpointManagerService].breakpoints
        ),
      {
        wrapper: getTestWrapper({ requiredManagers: [BreakpointManager] }),
      }
    );

    const breakpointManager =
      Weblancer.getManagerInstance<IBreakpointManagerActions>(
        BreakpointManager
      );

    const breakpointToUpdate = { ...Object.values(result.current)[0] };
    const id = breakpointToUpdate.id;

    act(() => {
      breakpointToUpdate.bottom = 200;
      breakpointManager.updateBreakpoint(breakpointToUpdate);
    });

    expect(result.current[id].bottom).toBe(200);
  });
});
