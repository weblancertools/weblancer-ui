import { render } from '@testing-library/react';

import PageManager from './page-manager';

describe('PageManager', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageManager />);
    expect(baseElement).toBeTruthy();
  });
});
