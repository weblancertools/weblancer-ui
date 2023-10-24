import classNames from 'classnames';
import styles from './childrenContainer.module.scss';
import {
  IComponentData,
  IWeblancerComponentProps,
} from '@weblancer-ui/prop-manager';
import { PropTypes } from '@weblancer-ui/types';

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
  return (
    <div
      className={classNames(
        styles.root,
        defineProp({
          name: 'childrenContainerStyle',
          typeInfo: {
            typeName: PropTypes.ClassName,
          },
        })
      )}
    >
      {children}
    </div>
  );
};
