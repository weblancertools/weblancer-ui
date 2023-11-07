import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { Page as BasePage } from '../../components/Page/Page';
import { ComponentManager } from '@weblancer-ui/component-manager';
import { IContainerProps, ResizeSide } from '@weblancer-ui/types';
import styles from './Page.module.scss';
import classNames from 'classnames';

export const Page = ({
  defineProp,
  children,
  rootProps,
  onMouseDown,
  onMouseUp,
  onTouchEnd,
}: IWeblancerComponentProps & IContainerProps) => {
  const { className, style: rootStyle, ...restRootProps } = rootProps ?? {};
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
      <BasePage>{children}</BasePage>
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
