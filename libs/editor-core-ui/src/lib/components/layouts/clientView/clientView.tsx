import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import { ClientIFrame } from './clientIFrame/clientIFrame';
import styles from './clientView.module.scss';
import classNames from 'classnames';
import { AdjustmentRenderer } from '../../molecules/adjustmentRenderer/adjustmentRenderer';

export const ClientView: FunctionComponent = () => {
  return (
    <div className={classNames(layoutStyle.clientView, styles.root)}>
      <ClientIFrame />
      <AdjustmentRenderer />
    </div>
  );
};
