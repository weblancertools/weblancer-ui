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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.BreakpointManager.editor.width
    // TODO Fix type issue
  );

  return (
    <Frame
      title="weblancer-client"
      className={styles.iframe}
      style={{
        width: width,
      }}
    >
      <WeblancerContextProvider store={store} type="preview">
        <ClientCore />
      </WeblancerContextProvider>
    </Frame>
  );
};
