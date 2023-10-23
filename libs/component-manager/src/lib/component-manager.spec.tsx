import { render } from '@testing-library/react';

import ComponentManager from './component-manager';

describe('ComponentManager', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentManager />);
    expect(baseElement).toBeTruthy();
  });
});
