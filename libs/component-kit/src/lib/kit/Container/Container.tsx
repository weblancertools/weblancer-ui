import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { Container as BaseContainer } from '../../components/Container/Container';
import { ComponentManager } from '@weblancer-ui/component-manager';

export const Container = ({
  defineProp,
  children,
}: IWeblancerComponentProps) => {
  return <BaseContainer>{children}</BaseContainer>;
};

ComponentManager.register('weblancer-component-kit-container', Container, {
  groups: 'Containers',
  categories: 'Weblancer',
  label: 'Container',
  componentMetadata: {
    isContainer: true,
  },
});
