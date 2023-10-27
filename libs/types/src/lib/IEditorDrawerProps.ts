export interface IEditorDrawerProps {
  isOpen: boolean;
  onOpen(drawerKey: string): void;
  onClose(drawerKey: string): void;
  onPined(drawerKey: string): void;
}

export type DrawerState = 'open' | 'close' | 'pined';
