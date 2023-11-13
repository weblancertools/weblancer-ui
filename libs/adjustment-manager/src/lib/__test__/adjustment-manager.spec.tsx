import { render } from '@testing-library/react';
import { Weblancer } from '@weblancer-ui/manager-registry';
import { EditorTestProvider } from '@weblancer-ui/test';
import { AdjustmentManager } from '../adjustment-manager';

describe('adjustment manager test', () => {
  it('must construct successfully', () => {
    render(<EditorTestProvider />);

    expect(() => {
      Weblancer.getManagerInstance(AdjustmentManager);
    }).not.toThrow();
  });
});
