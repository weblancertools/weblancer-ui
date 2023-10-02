import { getDefaultManagers } from '../../../../../helpers/getDefaultManagers';
import { WeblancerContextProvider } from '../../../../../context/weblancerContextProvider';
import { FunctionComponent } from 'react';
import { Manager } from '@weblancer-ui/types';
import { configureStore } from '@reduxjs/toolkit';
import { ClientCore } from '@weblancer-ui/client-core';
import Frame from 'react-frame-component';
import styles from './clientIFrame.module.scss';

export interface IClientIFrameProps {
  managers: Manager[];
  store: ReturnType<typeof configureStore>;
}

export const ClientIFrame: FunctionComponent<IClientIFrameProps> = ({
  store,
  managers,
}) => {
  return (
    <Frame title="weblancer-client" className={styles.iframe}>
      <WeblancerContextProvider
        store={store}
        managers={[...getDefaultManagers(), ...managers]}
        type="client"
      >
        <ClientCore />
      </WeblancerContextProvider>
    </Frame>
  );
};
