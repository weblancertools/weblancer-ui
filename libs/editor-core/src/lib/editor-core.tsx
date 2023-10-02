import styles from './editor-core.module.scss';

/* eslint-disable-next-line */
export interface EditorCoreProps {}

export function EditorCore(props: EditorCoreProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to EditorCore!</h1>
    </div>
  );
}

export default EditorCore;
