import { FunctionComponent } from 'react';
import Frame from 'react-frame-component';
import styles from './clientIFrame.module.scss';
import { ClientIFrameContent } from './clientIFrameContent';
import { useBreakpointManagerSelector } from '@weblancer-ui/breakpoint-manager';
import { IFrameId } from './constants';
import { WeblancerContextClientProvider } from '../../../../provider/weblancerClientContextProvider';

export const ClientIFrame: FunctionComponent = () => {
  const width = useBreakpointManagerSelector(
    (state) => state.BreakpointManager.editor.width
  );

  return (
    <div className={styles.root}>
      <Frame
        id={IFrameId}
        title={IFrameId}
        className={styles.iframe}
        style={{
          width: width,
        }}
      >
        <WeblancerContextClientProvider>
          <ClientIFrameContent />
        </WeblancerContextClientProvider>
      </Frame>
    </div>
  );
};
