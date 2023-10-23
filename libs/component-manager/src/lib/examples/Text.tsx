import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { PropTypes } from '@weblancer-ui/types';
import { ComponentManager } from '../component-manager';

interface ITextProps {
  text: string;
}

export const Text = ({ text }: ITextProps) => {
  return <p>{text}</p>;
};

export const WeblancerText = ({ defineProp }: IWeblancerComponentProps) => {
  return (
    <Text
      text={defineProp({
        name: 'text',
        typeInfo: {
          typeName: PropTypes.String,
        },
      })}
    />
  );
};

ComponentManager.register('weblancer-text', 'Text', WeblancerText, [
  'Weblancer',
  'Base Components',
]);
