import { FunctionComponent } from 'react';
import Frame from 'react-frame-component';
import styles from './clientIFrame.module.scss';
import { useSelector } from 'react-redux';
import { ClientIFrameContent } from './clientIFrameContent';

export const ClientIFrame: FunctionComponent = () => {
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
      <ClientIFrameContent />
    </Frame>
  );
};
