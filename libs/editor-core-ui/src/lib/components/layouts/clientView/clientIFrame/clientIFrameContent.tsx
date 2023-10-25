import { useCallback, useEffect } from 'react';
import { ClientCore } from '@weblancer-ui/client-core';
import { useDispatch } from 'react-redux';
import { setCurrentBreakpoint } from '@weblancer-ui/breakpoint-manager';
import { copyStylesToIFrame } from './helpers';
import { useWeblancerClientContext } from '@weblancer-ui/editor-core';

const _document = document;

export const ClientIFrameContent = () => {
  const { window, document } = useWeblancerClientContext();
  const dispatch = useDispatch();

  const handleClientWindowSizeChange = useCallback(() => {
    if (!window) return;
    dispatch(setCurrentBreakpoint(window.innerWidth));
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
