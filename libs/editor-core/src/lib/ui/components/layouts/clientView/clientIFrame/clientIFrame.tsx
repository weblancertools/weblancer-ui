import { WeblancerContextProvider } from '../../../../../context/weblancerContextProvider';
import { FunctionComponent } from 'react';
import { IReduxStore } from '@weblancer-ui/types';
import { ClientCore } from '@weblancer-ui/client-core';
import Frame from 'react-frame-component';
import styles from './clientIFrame.module.scss';
import { useSelector } from 'react-redux';

export interface IClientIFrameProps {
  store: IReduxStore;
}

export const ClientIFrame: FunctionComponent<IClientIFrameProps> = ({
  store,
}) => {
  const width = useSelector(
    (state: any) => state.BreakpointManager.editor.width
  );

  return (
    <Frame
      title="weblancer-client"
      className={styles.iframe}
      style={{
        width: width,
      }}
    >
      <WeblancerContextProvider store={store} type="client">
        <ClientCore />
      </WeblancerContextProvider>
    </Frame>
  );
};
