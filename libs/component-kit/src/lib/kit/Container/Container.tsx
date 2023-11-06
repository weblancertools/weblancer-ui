import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { Container as BaseContainer } from '../../components/Container/Container';
import { ComponentManager } from '@weblancer-ui/component-manager';
import { IContainerProps } from '@weblancer-ui/types';

export const Container = ({
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
});
