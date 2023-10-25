import { useWeblancerContext } from '@weblancer-ui/editor-core';
import styles from './adjustmentRenderer.module.scss';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { IFrameId } from '../../layouts/clientView/clientIFrame/constants';
import { useState } from 'react';

export const AdjustmentRenderer = () => {
  const [iframeRect, setIframeRect] = useState<DOMRect>();

  const { getPlugins } = useWeblancerContext();

  useEffect(() => {
    const iframe = document.getElementById(IFrameId);
    setIframeRect(iframe?.getBoundingClientRect());
  }, []);

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
