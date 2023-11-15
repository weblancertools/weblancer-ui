import { render } from '@testing-library/react';

import LocalContext from './local-context';

describe('LocalContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LocalContext />);
    expect(baseElement).toBeTruthy();
  });
});
