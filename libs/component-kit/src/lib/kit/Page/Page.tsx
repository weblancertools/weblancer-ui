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
import { ISectionData, ISectionProps } from './types';
import { reArrangeSections } from './helpers';
import { useWeblancerEffect } from '@weblancer-ui/utils';
import { useWeblancerCommonManager } from '@weblancer-ui/tool-kit';

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

  const { propManager } = useWeblancerCommonManager();

  const sectionsData = defineProp<Record<string, ISectionData>>({
    name: 'sections',
    typeInfo: {
      typeName: PropTypes.None,
      defaultValue: {},
    },
  });

  const childrenCount = React.Children.count(children);

  const handleChildrenCountChange = () => {
    const reArrangedSectionsData = reArrangeSections(children, sectionsData);
    propManager.updateComponentProp(itemId, 'sections', reArrangedSectionsData);
  };

  useWeblancerEffect(() => {
    handleChildrenCountChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenCount]);

  const handleSectionUp = () => {
    // TODO
  };

  const handleSectionDown = () => {
    // TODO
  };

  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const sectionProps: ISectionProps = {
        handleSectionDown,
        handleSectionUp,
        sectionData: sectionsData[child.key as string],
      };

      return React.cloneElement(child, {
        ...child.props,
        ...sectionProps,
      });
    }
    return child;
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
    },
    dragging: {
      restrictedMovementAxises: ['x', 'y'],
    },
  },
});
