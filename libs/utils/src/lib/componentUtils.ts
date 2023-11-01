import { Store } from '@reduxjs/toolkit';

export function waitForComponentPropsDefined(
  store: Store,
  callback: () => void
) {
  let count = 0;
  const unsubscribe = store.subscribe(() => {
    count++;
    if (count === 3) {
      callback();
      unsubscribe();
    }
  });
}
