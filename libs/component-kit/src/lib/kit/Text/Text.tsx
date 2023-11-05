import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { Text as BaseText } from '../../components/Text/Text';
import { PropTypes } from '@weblancer-ui/types';

export const Text = ({ defineProp }: IWeblancerComponentProps) => {
  return (
    <BaseText
      text={defineProp({
        name: 'text',
        typeInfo: {
          typeName: PropTypes.String,
          defaultValue: 'My Text',
        },
      })}
    />
  );
};
