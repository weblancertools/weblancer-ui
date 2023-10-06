import { getDefaultManagers } from '../../../../../helpers/getDefaultManagers';
import { WeblancerContextProvider } from '../../../../../context/weblancerContextProvider';
import { FunctionComponent } from 'react';
import { IManager, IReduxStore } from '@weblancer-ui/types';
import { ClientCore } from '@weblancer-ui/client-core';
import Frame from 'react-frame-component';
import styles from './clientIFrame.module.scss';

export interface IClientIFrameProps {
  managers: IManager[];
  store: ReturnType<IReduxStore>;
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
