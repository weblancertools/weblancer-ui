import { FunctionComponent } from 'react';
import layoutStyle from '../../../styles/editorLayout.module.scss';
import { ClientIFrame } from './clientIFrame/clientIFrame';
import { useWeblancerContext } from '../../../../context/weblancerContext';
import styles from './clientView.module.scss';
import classNames from 'classnames';

export const ClientView: FunctionComponent = () => {
  const { weblancerManager } = useWeblancerContext();

  return (
    <div className={classNames(layoutStyle.clientView, styles.root)}>
      <ClientIFrame
        store={weblancerManager.store}
        managers={weblancerManager.getManagers()}
      />
    </div>
  );
};
