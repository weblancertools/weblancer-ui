import { IEditorDrawerProps } from '@weblancer-ui/types';
import { noop } from 'lodash';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface IComponentDrawerContext {
  category: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
  group: string | null;
  setGroup: React.Dispatch<React.SetStateAction<string | null>>;
  onClose(): void;
}

const ComponentDrawerContext = createContext<IComponentDrawerContext>({
  category: null,
  setCategory: noop,
  group: null,
  setGroup: noop,
  onClose: noop,
});

export const useComponentDrawerContext = () =>
  useContext(ComponentDrawerContext);

export const ComponentDrawerProvider = ({
  children,
  onClose,
}: PropsWithChildren & IEditorDrawerProps) => {
  const [category, setCategory] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);

  return (
    <ComponentDrawerContext.Provider
      value={{ category, setCategory, group, setGroup, onClose }}
    >
      {children}
    </ComponentDrawerContext.Provider>
  );
};
