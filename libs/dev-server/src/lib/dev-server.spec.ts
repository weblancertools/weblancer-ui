import { devServer } from './dev-server';

describe('devServer', () => {
  it('should work', () => {
    expect(devServer()).toEqual('dev-server');
  });
});
