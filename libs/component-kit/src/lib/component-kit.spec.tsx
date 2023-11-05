import { render } from '@testing-library/react';

import ComponentKit from './component-kit';

describe('ComponentKit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentKit />);
    expect(baseElement).toBeTruthy();
  });
});
