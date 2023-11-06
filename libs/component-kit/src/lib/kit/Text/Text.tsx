import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { Text as BaseText } from '../../components/Text/Text';
import { PropTypes } from '@weblancer-ui/types';
import { ComponentManager } from '@weblancer-ui/component-manager';

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

ComponentManager.register('weblancer-component-kit-text', Text, {
  groups: 'Texts',
  categories: 'Weblancer',
  label: 'Text',
});
