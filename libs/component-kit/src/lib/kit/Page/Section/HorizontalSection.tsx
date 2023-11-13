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
import { SectionComponentKey } from '../constants';
import { ComponentChildStyle } from '@weblancer-ui/adjustment-manager';

export const HorizontalSection = ({
  defineProp,
  children,
  rootProps,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
  sectionData,
  moveSection,
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
        gridRowStart: sectionData.gridArea.rowStart,
        gridRowEnd: sectionData.gridArea.rowEnd,
        gridColumnStart: sectionData.gridArea.columnStart,
        gridColumnEnd: sectionData.gridArea.columnEnd,
      }}
    >
      <BaseContainer>{children}</BaseContainer>
    </div>
  );
};

ComponentManager.register(SectionComponentKey, HorizontalSection, {
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
  defaultComponentData: {
    props: {
      [ComponentChildStyle]: {
        large: {
          name: ComponentChildStyle,
          value: {
            style: {
              height: 500,
            },
          },
        },
      },
    },
  },
});
