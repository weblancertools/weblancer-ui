import {
  DrawerState,
  IEditorDrawerProps,
  IEditorUIPlugin,
} from '@weblancer-ui/types';
import styles from './leftDrawer.module.scss';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import { useState } from 'react';
import classNames from 'classnames';

interface ILeftDrawer {
  leftMenus: IEditorUIPlugin[];
}

export const LeftDrawer = ({ leftMenus }: ILeftDrawer) => {
  const leftDrawers: Record<
    string,
    React.ComponentType<IEditorDrawerProps>
  > = leftMenus.reduce(
    (obj, menu) =>
      menu.leftDrawer ? { ...obj, [menu.name]: menu.rightDrawer } : obj,
    {}
  );

  const [drawersState, setDrawersState] = useState<Record<string, DrawerState>>(
    Object.fromEntries(Object.keys(leftDrawers).map((key) => [key, 'close']))
  );

  const handleOpen = (drawerKey: string) => {
    if (drawersState[drawerKey] === 'open') return;
    setDrawersState({
      ...drawersState,
      [drawerKey]: 'open',
    });
  };

  const handleClose = (drawerKey: string) => {
    if (drawersState[drawerKey] === 'close') return;
    setDrawersState({
      ...drawersState,
      [drawerKey]: 'close',
    });
  };

  const handlePined = (drawerKey: string) => {
    if (drawersState[drawerKey] === 'pined') return;
    setDrawersState({
      ...drawersState,
      [drawerKey]: 'pined',
    });
  };

  const hasAnyOpenDrawer = Object.values(drawersState).some(
    (state) => state === 'open'
  );
  const hasAnyPinedDrawer = Object.values(drawersState).some(
    (state) => state === 'pined'
  );

  return (
    <div
      className={classNames(
        styles.root,
        layoutStyle.leftDrawer,
        hasAnyOpenDrawer && styles.open,
        hasAnyPinedDrawer && styles.pined,
        hasAnyPinedDrawer && layoutStyle.pined
      )}
    >
      {Object.keys(leftDrawers).map((drawerKey) => {
        const Drawer = leftDrawers[drawerKey];

        return (
          <Drawer
            key={drawerKey}
            isOpen={drawersState[drawerKey] === 'open'}
            onOpen={handleOpen}
            onClose={handleClose}
            onPined={handlePined}
          />
        );
      })}
    </div>
  );
};
