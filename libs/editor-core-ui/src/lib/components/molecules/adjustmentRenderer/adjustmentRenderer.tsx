import { useWeblancerContext } from '@weblancer-ui/editor-core';
import styles from './adjustmentRenderer.module.scss';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useBreakpointManagerSelector } from '@weblancer-ui/breakpoint-manager';
import { IFrameId } from '@weblancer-ui/utils';

export const AdjustmentRenderer = () => {
  const [iframeRect, setIframeRect] = useState<DOMRect>();
  const width = useBreakpointManagerSelector(
    (state) => state.BreakpointManager.editor.width
  );

  const { getPlugins } = useWeblancerContext();

  useEffect(() => {
    const iframe = document.getElementById(IFrameId);
    setIframeRect(iframe?.getBoundingClientRect());
  }, [width]);

  if (!iframeRect) return;

  return (
    <div
      className={styles.root}
      style={{
        left: iframeRect.left,
        top: iframeRect.top,
        width: iframeRect.width,
        height: iframeRect.height,
      }}
    >
      {getPlugins().map((plugin, index) => {
        if (!plugin.adjustments) return null;
        return <Fragment key={index}>{...plugin.adjustments}</Fragment>;
      })}
    </div>
  );
};
