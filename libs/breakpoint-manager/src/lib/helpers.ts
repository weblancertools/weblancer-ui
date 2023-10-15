import { IBreakpoint } from './types';

export const defaultBreakpoints: Record<string, IBreakpoint> = {
  large: {
    id: 'large',
    bottom: 1001,
  },
  medium: {
    id: 'medium',
    bottom: 750,
  },
  small: {
    id: 'small',
    bottom: 320,
  },
};

export function getSortedBreakpoints(
  breakpoints: Record<string, IBreakpoint>
): IBreakpoint[] {
  return Object.values(breakpoints).sort((a, b) => a.bottom - b.bottom);
}
