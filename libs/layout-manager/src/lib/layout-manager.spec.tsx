import { render } from '@testing-library/react';

import LayoutManager from './layout-manager';

describe('LayoutManager', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutManager />);
    expect(baseElement).toBeTruthy();
  });
});
