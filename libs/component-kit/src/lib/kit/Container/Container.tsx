import { Container as BaseContainer } from '../../components/Container/Container';
import { ComponentManager } from '@weblancer-ui/component-manager';
import { IContainerProps, IWeblancerComponentProps } from '@weblancer-ui/types';
import { ComponentChildStyle } from '@weblancer-ui/adjustment-manager';

export const Container = ({
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
      className={className}
      style={{
        ...rootStyle,
      }}
    >
      <BaseContainer>{children}</BaseContainer>
    </div>
  );
};

ComponentManager.register('weblancer-component-kit-container', Container, {
  groups: 'Containers',
  categories: 'Weblancer',
  label: 'Container',
  componentMetadata: {
    isContainer: true,
  },
  defaultComponentData: {
    props: {
      [ComponentChildStyle]: {
        large: {
          name: ComponentChildStyle,
          value: {
            style: {
              width: 100,
              height: 100,
            },
          },
        },
      },
    },
  },
});
