import { getSortedBreakpoints } from '../helpers';

describe('breakpoint helpers', () => {
  it('getSortedBreakpoints', () => {
    const allBreakpoints = {
      large: {
        id: 'large',
        bottom: 1001,
      },
      small: {
        id: 'small',
        bottom: 320,
      },
      medium: {
        id: 'medium',
        bottom: 750,
      },
    };

    const sortedBreakpoints = getSortedBreakpoints(allBreakpoints);

    expect(sortedBreakpoints[2].id).toBe('small');
  });
});
