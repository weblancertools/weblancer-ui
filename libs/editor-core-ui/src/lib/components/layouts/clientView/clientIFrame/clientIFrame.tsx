import { FunctionComponent } from 'react';
import Frame from 'react-frame-component';
import styles from './clientIFrame.module.scss';
import { ClientIFrameContent } from './clientIFrameContent';
import { useBreakpointManagerSelector } from '@weblancer-ui/breakpoint-manager';

export const ClientIFrame: FunctionComponent = () => {
  const width = useBreakpointManagerSelector(
    (state) => state.BreakpointManager.editor.width
  );

  return (
    <div className={styles.root}>
      <Frame
        title="weblancer-client"
        className={styles.iframe}
        style={{
          width: width,
        }}
      >
        <ClientIFrameContent />
      </Frame>
    </div>
  );
};
