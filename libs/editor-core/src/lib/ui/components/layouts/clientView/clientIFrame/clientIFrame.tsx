import { WeblancerContextProvider } from '../../../../../context/weblancerContextProvider';
import { FunctionComponent } from 'react';
import { IReduxStore } from '@weblancer-ui/types';
import { ClientCore } from '@weblancer-ui/client-core';
import Frame from 'react-frame-component';
import styles from './clientIFrame.module.scss';

export interface IClientIFrameProps {
  store: IReduxStore;
}

export const ClientIFrame: FunctionComponent<IClientIFrameProps> = ({
  store,
}) => {
  return (
    <Frame title="weblancer-client" className={styles.iframe}>
      <WeblancerContextProvider store={store} type="client">
        <ClientCore />
      </WeblancerContextProvider>
    </Frame>
  );
};
