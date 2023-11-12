import { Page as BasePage } from '../../components/Page/Page';
import { ComponentManager } from '@weblancer-ui/component-manager';
import {
  IContainerProps,
  IWeblancerComponentProps,
  PropTypes,
  ResizeSide,
} from '@weblancer-ui/types';
import styles from './Page.module.scss';
import classNames from 'classnames';
import React from 'react';
import { ISectionProps, MoveDirection, SectionIndexMap } from './types';
import { useWeblancerManager } from '@weblancer-ui/editor-core';
import { useWeblancerCommonManager } from '@weblancer-ui/tool-kit';
import { SectionMapPropName } from './constants';
import { ISectionManagerActions } from './sectionManager/types';
import { SectionManager } from './sectionManager/sectionManager';

export const Page = ({
  itemId,
  defineProp,
  children,
  rootProps,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
}: IWeblancerComponentProps & IContainerProps) => {
  const { className, style: rootStyle, ...restRootProps } = rootProps ?? {};

  const sectionManager =
    useWeblancerManager<ISectionManagerActions>(SectionManager);
  const { propManager } = useWeblancerCommonManager();

  const sectionMap = defineProp<SectionIndexMap>({
    name: SectionMapPropName,
    typeInfo: {
      typeName: PropTypes.None,
      defaultValue: {},
    },
  });

  const moveSection = (sectionId: string, direction: MoveDirection) => {
    const newSectionMap = sectionManager.moveSection(
      sectionId,
      direction,
      sectionMap
    );

    propManager.updateComponentProp(
      itemId,
      SectionMapPropName,
      newSectionMap,
      true
    );
  };

  const modifiedChildren = Object.values(sectionMap).map((sectionData) => {
    const child = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) && child.props.itemId === sectionData.id
    );

    if (!React.isValidElement(child)) return null;

    const sectionProps: ISectionProps = {
      moveSection,
      sectionData,
    };

    return React.cloneElement(child, {
      ...child.props,
      ...sectionProps,
    });
  });

  return (
    <div
      {...restRootProps}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      className={classNames(className, styles.root)}
      style={{
        ...rootStyle,
        gridTemplateRows: new Array(Object.keys(sectionMap).length)
          .fill('auto')
          .join(' '),
      }}
    >
      <BasePage>{modifiedChildren}</BasePage>
    </div>
  );
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
      restrictedChildrenPositioning: true,
    },
    dragging: {
      restrictedMovementAxises: ['x', 'y'],
    },
  },
});
