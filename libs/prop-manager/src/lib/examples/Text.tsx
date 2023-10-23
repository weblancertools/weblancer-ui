import { PropTypes } from '@weblancer-ui/types';
import { IWeblancerComponentProps } from '../types';

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

// TODO bind WeblancerText component to the component manager
