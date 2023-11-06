import { PropsWithChildren } from 'react';
import styles from './Page.module.scss';

export const Page = ({ children }: PropsWithChildren) => {
  return <div className={styles.root}>{children}</div>;
};
