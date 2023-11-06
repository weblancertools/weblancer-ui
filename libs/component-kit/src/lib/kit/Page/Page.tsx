import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { Page as BasePage } from '../../components/Page/Page';

export const Page = ({ defineProp, children }: IWeblancerComponentProps) => {
  return <BasePage>{children}</BasePage>;
};
