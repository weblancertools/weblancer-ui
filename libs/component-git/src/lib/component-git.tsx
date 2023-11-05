import styles from './component-git.module.scss';

/* eslint-disable-next-line */
export interface ComponentGitProps {}

export function ComponentGit(props: ComponentGitProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ComponentGit!</h1>
    </div>
  );
}

export default ComponentGit;
