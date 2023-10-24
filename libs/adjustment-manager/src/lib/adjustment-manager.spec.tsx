import { render } from '@testing-library/react';

import AdjustmentManager from './adjustment-manager';

describe('AdjustmentManager', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdjustmentManager />);
    expect(baseElement).toBeTruthy();
  });
});
