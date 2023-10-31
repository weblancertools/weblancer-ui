import { WeblancerComponentIdAttributeName } from '@weblancer-ui/types';

export const findFirstWeblancerRootId = (node: HTMLElement): string | null => {
  let parent: HTMLElement | null = node;

  while (parent) {
    if (parent.hasAttribute(WeblancerComponentIdAttributeName)) {
      return parent.getAttribute(WeblancerComponentIdAttributeName);
    }
    parent = parent.parentElement;
  }

  return null;
};
