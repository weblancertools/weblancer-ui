import styles from './undoRedoButtons.module.scss';
import { UndoManager } from '../../undo-manager';
import { IUndoManagerActions, useUndoManagerSelector } from '../../types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';
import classNames from 'classnames';

export const UndoRedoButtons = () => {
  const undoManager =
    weblancerRegistry.getManagerInstance<IUndoManagerActions>(UndoManager);

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
