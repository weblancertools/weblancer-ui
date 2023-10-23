import { PropTypes } from '@weblancer-ui/types';
import { IWeblancerProps } from '../types';

interface ITextProps {
  text: string;
}

export const Text = ({ text }: ITextProps) => {
  return <p>{text}</p>;
};

export const WeblancerText = ({
  itemId,
  propManager: { defineComponentProp },
}: IWeblancerProps) => {
  return (
    <Text
      text={defineComponentProp(itemId, {
        name: 'text',
        typeInfo: {
          typeName: PropTypes.String,
          defaultValue: '',
        },
      })}
    />
  );
};

// TODO bind WeblancerText component to the component manager
