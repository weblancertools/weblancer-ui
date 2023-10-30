import { noop } from 'lodash';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface IComponentDrawerContext {
  category: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
  group: string | null;
  setGroup: React.Dispatch<React.SetStateAction<string | null>>;
}

const ComponentDrawerContext = createContext<IComponentDrawerContext>({
  category: null,
  setCategory: noop,
  group: null,
  setGroup: noop,
});

export const useComponentDrawerContext = () =>
  useContext(ComponentDrawerContext);

export const ComponentDrawerProvider = ({ children }: PropsWithChildren) => {
  const [category, setCategory] = useState<string | null>(null);
  const [group, setGroup] = useState<string | null>(null);

  return (
    <ComponentDrawerContext.Provider
      value={{ category, setCategory, group, setGroup }}
    >
      {children}
    </ComponentDrawerContext.Provider>
  );
};
