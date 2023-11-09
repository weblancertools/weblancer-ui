import { Container as BaseContainer } from '../../../components/Container/Container';
import { ComponentManager } from '@weblancer-ui/component-manager';
import {
  IContainerProps,
  IWeblancerComponentProps,
  ResizeSide,
} from '@weblancer-ui/types';
import styles from './HorizontalSection.module.scss';
import classNames from 'classnames';
import { ISectionProps } from '../types';

export const HorizontalSection = ({
  defineProp,
  children,
  rootProps,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
  sectionData,
  handleSectionUp,
  handleSectionDown,
}: IWeblancerComponentProps & IContainerProps & ISectionProps) => {
  const { className, style: rootStyle, ...restRootProps } = rootProps ?? {};

  // TODO register handleSectionUp and handleSectionDown to miniMenu
  return (
    <div
      {...restRootProps}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      className={classNames(styles.root, className)}
      style={{
        ...rootStyle,
      }}
    >
      <BaseContainer>{children}</BaseContainer>
    </div>
  );
};

const ComponentKey = 'weblancer-component-kit-horizontal-section';
ComponentManager.register(ComponentKey, HorizontalSection, {
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
});
