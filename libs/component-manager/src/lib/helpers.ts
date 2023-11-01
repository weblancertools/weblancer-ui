import { Store } from '@reduxjs/toolkit';

export function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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
