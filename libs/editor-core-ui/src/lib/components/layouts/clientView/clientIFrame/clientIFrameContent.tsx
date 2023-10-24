import { useCallback, useEffect } from 'react';
import { ClientCore } from '@weblancer-ui/client-core';
import { useFrame } from 'react-frame-component';
import { useDispatch } from 'react-redux';
import { setCurrentBreakpoint } from '@weblancer-ui/breakpoint-manager';
import { copyStylesToIFrame } from './helpers';

const _document = document;

export const ClientIFrameContent = () => {
  const { window, document } = useFrame();
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

  useEffect(() => {
    if (document) {
      document.body.style.margin = '0px';
      copyStylesToIFrame(document, _document);
    }
  }, [document]);

  return <ClientCore />;
};
