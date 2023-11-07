import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { Container as BaseContainer } from '../../components/Container/Container';
import { ComponentManager } from '@weblancer-ui/component-manager';
import { IContainerProps, ResizeSide } from '@weblancer-ui/types';
import styles from './HorizontalSection.module.scss';
import classNames from 'classnames';

export const HorizontalSection = ({
  defineProp,
  children,
  rootProps,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
}: IWeblancerComponentProps & IContainerProps) => {
  return (
    <div
      {...rootProps}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      className={classNames(styles.root, rootProps?.className)}
    >
      <BaseContainer>{children}</BaseContainer>
    </div>
  );
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
