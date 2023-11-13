import { Text as BaseText } from '../../components/Text/Text';
import { IWeblancerComponentProps, PropTypes } from '@weblancer-ui/types';
import { Weblancer } from '@weblancer-ui/manager-registry';

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

Weblancer.registerComponent('weblancer-component-kit-text', Text, {
  groups: 'Texts',
  categories: 'Weblancer',
  label: 'Text',
});
