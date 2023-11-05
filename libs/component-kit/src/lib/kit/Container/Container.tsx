import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { Container as BaseContainer } from '../../components/Container/Container';

export const Container = ({
  defineProp,
  children,
}: IWeblancerComponentProps) => {
  return <BaseContainer>{children}</BaseContainer>;
};
