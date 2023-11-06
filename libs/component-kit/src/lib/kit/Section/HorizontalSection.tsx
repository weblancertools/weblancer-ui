import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { Container as BaseContainer } from '../../components/Container/Container';
import { ComponentManager } from '@weblancer-ui/component-manager';
import { ResizeSide } from '@weblancer-ui/types';

export const HorizontalSection = ({
  defineProp,
  children,
}: IWeblancerComponentProps) => {
  return <BaseContainer>{children}</BaseContainer>;
};

ComponentManager.register(
  'weblancer-component-kit-horizontal-section',
  HorizontalSection,
  {
    groups: 'Section',
    categories: 'Weblancer',
    label: 'Horizontal Section',
    componentMetadata: {
      isContainer: true,
      resize: {
        restrictedResizeSides: [
          ResizeSide.E,
          ResizeSide.N,
          ResizeSide.NE,
          ResizeSide.NW,
          ResizeSide.SE,
          ResizeSide.SW,
          ResizeSide.W,
        ],
      },
      dragging: {
        restrictedMovementAxises: ['x', 'y'],
      },
    },
  }
);
