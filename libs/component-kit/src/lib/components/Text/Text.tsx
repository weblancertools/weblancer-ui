interface ITextProps {
  text: string;
}

export const Text = ({ text }: ITextProps) => {
  return <div>{text}</div>;
};
