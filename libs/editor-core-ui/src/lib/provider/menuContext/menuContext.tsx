import { DrawerState } from '@weblancer-ui/types';
import { noop } from 'lodash';
import { useState } from 'react';
import { PropsWithChildren } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

interface IMenuContext {
  openMenuName: string | null;
  setOpenMenuName: React.Dispatch<React.SetStateAction<string | null>>;
  state: DrawerState;
  setState: React.Dispatch<React.SetStateAction<DrawerState>>;
}

const MenuContext = createContext<IMenuContext>({
  openMenuName: null,
  setOpenMenuName: noop,
  state: 'close',
  setState: noop,
});

export const useMenuContext = () => useContext(MenuContext);

export const MenuProvider = ({ children }: PropsWithChildren) => {
  const [openMenuName, setOpenMenuName] = useState<string | null>(null);
  const [state, setState] = useState<DrawerState>('close');

  return (
    <MenuContext.Provider
      value={{ openMenuName, setOpenMenuName, state, setState }}
    >
      {children}
    </MenuContext.Provider>
  );
};
