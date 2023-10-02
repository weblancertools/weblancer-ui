import { render } from '@testing-library/react';

import ClientCore from './client-core';

describe('ClientCore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientCore />);
    expect(baseElement).toBeTruthy();
  });
});
