import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { Page as BasePage } from '../../components/Page/Page';
import { ComponentManager } from '@weblancer-ui/component-manager';
import { ResizeSide } from '@weblancer-ui/types';

export const Page = ({ defineProp, children }: IWeblancerComponentProps) => {
  return <BasePage>{children}</BasePage>;
};

ComponentManager.register('weblancer-component-kit-page', Page, {
  groups: 'Containers',
  categories: 'Weblancer',
  label: 'Page',
  componentMetadata: {
    isContainer: true,
    resize: {
      restrictedResizeSides: [
        ResizeSide.E,
        ResizeSide.N,
        ResizeSide.NE,
        ResizeSide.NW,
        ResizeSide.S,
        ResizeSide.SE,
        ResizeSide.SW,
        ResizeSide.W,
      ],
    },
    dragging: {
      restrictedMovementAxises: ['x', 'y'],
    },
  },
});
