import {
  DrawerState,
  IEditorDrawerProps,
  IEditorUIPlugin,
} from '@weblancer-ui/types';
import styles from './rightDrawer.module.scss';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import { useState } from 'react';
import classNames from 'classnames';

interface IRightDrawer {
  rightMenus: IEditorUIPlugin[];
}

export const RightDrawer = ({ rightMenus }: IRightDrawer) => {
  const rightDrawers: Record<
    string,
    React.ComponentType<IEditorDrawerProps>
  > = rightMenus.reduce(
    (obj, menu) =>
      menu.rightDrawer ? { ...obj, [menu.name]: menu.rightDrawer } : obj,
    {}
  );

  const [drawersState, setDrawersState] = useState<Record<string, DrawerState>>(
    Object.fromEntries(Object.keys(rightDrawers).map((key) => [key, 'close']))
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
        layoutStyle.rightDrawer,
        hasAnyOpenDrawer && styles.open,
        hasAnyPinedDrawer && styles.pined,
        hasAnyPinedDrawer && layoutStyle.pined
      )}
    >
      {Object.keys(rightDrawers).map((drawerKey) => {
        const Drawer = rightDrawers[drawerKey];

        return (
          <Drawer
            isOpen={drawersState[drawerKey] === 'open'}
            key={drawerKey}
            onOpen={handleOpen}
            onClose={handleClose}
            onPined={handlePined}
          />
        );
      })}
    </div>
  );
};
