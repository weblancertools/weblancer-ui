import { FunctionComponent, useCallback, useEffect } from 'react';
import { ClientCore } from '@weblancer-ui/client-core';
import { useFrame } from 'react-frame-component';
import { useDispatch } from 'react-redux';
import { setCurrentBreakpoint } from '@weblancer-ui/breakpoint-manager';

export const ClientIFrameContent: FunctionComponent = () => {
  const { window } = useFrame();
  const dispatch = useDispatch();

  const handleClientWindowSizeChange = useCallback(() => {
    if (!window) return;
    const width = window.innerWidth;

    dispatch(setCurrentBreakpoint(width));
  }, [window, dispatch]);

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
