import { useWeblancerEditor } from '@weblancer-ui/editor-core';
import styles from './adjustmentRenderer.module.scss';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useBreakpointManagerSelector } from '@weblancer-ui/breakpoint-manager';
import { IFrameId } from '@weblancer-ui/utils';
import { useWeblancerCommonManager } from '@weblancer-ui/tool-kit';
import { useSelector } from 'react-redux';
import { IComponentData } from '@weblancer-ui/types';

export const AdjustmentRenderer = () => {
  const [iframeRect, setIframeRect] = useState<DOMRect>();
  const width = useBreakpointManagerSelector(
    (state) => state.BreakpointManager.editor.width
  );

  const { layoutManager, adjustmentManager, propManager } =
    useWeblancerCommonManager();

  const { getPlugins } = useWeblancerEditor();

  useEffect(() => {
    const iframe = document.getElementById(IFrameId);
    setIframeRect(iframe?.getBoundingClientRect());
  }, [width]);

  const pageData: IComponentData = useSelector(
    propManager.getPageDataSelector()
  );

  const clientDocument = layoutManager.getClientDocument();

  useEffect(() => {
    if (!clientDocument || !pageData) return;

    // TODO do it for any scrollable item
    adjustmentManager
      .getItemRootRef(pageData.id)
      .current?.addEventListener('scroll', () => {
        adjustmentManager.setScrollUpdated();
      });
  }, [pageData, clientDocument, adjustmentManager]);

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
