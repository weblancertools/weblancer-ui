import { FunctionComponent, useCallback, useEffect } from 'react';
import { ClientCore } from '@weblancer-ui/client-core';
import { useFrame } from 'react-frame-component';

export const ClientIFrameContent: FunctionComponent = () => {
  const { window } = useFrame();

  const handleClientWindowSizeChange = useCallback(() => {
    if (!window) return;
    const width = window.innerWidth;
    console.log(width);
    // TODO set breakpoint width
  }, [window]);

  useEffect(() => {
    if (window) {
      handleClientWindowSizeChange();
      window.addEventListener('resize', handleClientWindowSizeChange);
    }

    return () => {
      window?.removeEventListener('resize', handleClientWindowSizeChange);
    };
  }, [window, handleClientWindowSizeChange]);

  return <ClientCore />;
};
