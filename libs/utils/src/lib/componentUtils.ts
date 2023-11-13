import { WeblancerComponentIdAttributeName } from '@weblancer-ui/types';

export function waitForComponentPropsDefined(
  itemId: string,
  document: Document,
  callback: () => void
) {
  const intervalId = setInterval(() => {
    const node = document.querySelector(
      `[${WeblancerComponentIdAttributeName}="${itemId}"]`
    );
    if (node) {
      clearInterval(intervalId);
      callback();
    }
  }, 0);
}
