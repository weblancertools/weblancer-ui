import { render } from '@testing-library/react';

import EditorCore from './editor-core';

describe('EditorCore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorCore />);
    expect(baseElement).toBeTruthy();
  });
});
