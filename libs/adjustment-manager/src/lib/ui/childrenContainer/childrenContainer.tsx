import {
  IComponentData,
  IWeblancerComponentProps,
} from '@weblancer-ui/prop-manager';

interface IChildrenContainerProps extends IWeblancerComponentProps {
  itemId: string;
  componentData: IComponentData;
}

export const ChildrenContainer = ({
  itemId,
  componentData,
  defineProp,
  children,
}: IChildrenContainerProps) => {
  return children;
};
