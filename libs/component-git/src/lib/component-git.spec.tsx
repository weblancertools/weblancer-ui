import { render } from '@testing-library/react';

import ComponentGit from './component-git';

describe('ComponentGit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentGit />);
    expect(baseElement).toBeTruthy();
  });
});
