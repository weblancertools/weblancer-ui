import { IWeblancerComponentProps } from '@weblancer-ui/prop-manager';
import { PropTypes } from '@weblancer-ui/types';
import { ReactNode } from 'react';

interface ITextProps {
  text: string;
  children?: ReactNode;
}

export const Text = ({ text, children }: ITextProps) => {
  return (
    <>
      <div>{text}</div>
      {children}
    </>
  );
};

export const WeblancerText = ({
  defineProp,
  children,
}: IWeblancerComponentProps) => {
  return (
    <Text
      text={defineProp({
        name: 'text',
        typeInfo: {
          typeName: PropTypes.String,
          defaultValue: 'My Text',
        },
      })}
    >
      {children}
    </Text>
  );
};
