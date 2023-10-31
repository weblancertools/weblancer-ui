export interface IEditorDrawerProps {
  onClose(): void;
}

export type DrawerState = 'open' | 'close' | 'pined';
