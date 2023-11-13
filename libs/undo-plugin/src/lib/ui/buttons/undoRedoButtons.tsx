import styles from './undoRedoButtons.module.scss';
import { Weblancer } from '@weblancer-ui/manager-registry';
import {
  IUndoManagerActions,
  UndoManager,
  useUndoManagerSelector,
} from '@weblancer-ui/undo-manager';
import classNames from 'classnames';

export const UndoRedoButtons = () => {
  const undoManager =
    Weblancer.getManagerInstance<IUndoManagerActions>(UndoManager);

  const hasUndo = useUndoManagerSelector((state) => state.UndoManager.hasUndo);
  const hasRedo = useUndoManagerSelector((state) => state.UndoManager.hasRedo);

  const undo = () => {
    undoManager.undo();
  };

  const redo = () => {
    undoManager.redo();
  };

  return (
    <div className={styles.root}>
      <div
        className={classNames(styles.undo, !hasUndo && styles.disabled)}
        onClick={undo}
      >
        undo
      </div>
      <div
        className={classNames(styles.redo, !hasRedo && styles.disabled)}
        onClick={redo}
      >
        redo
      </div>
    </div>
  );
};
