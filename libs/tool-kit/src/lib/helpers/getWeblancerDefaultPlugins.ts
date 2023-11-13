import { adjustmentPlugin } from '@weblancer-ui/adjustment-manager';
import { extraAdjustmentPlugin } from '@weblancer-ui/adjustment-plugin';
import { breakpointUiPlugin } from '@weblancer-ui/breakpoint-manager';
import { componentPlugin } from '@weblancer-ui/component-manager';
import { inspectorPlugin } from '@weblancer-ui/inspector-manager';
import { layoutPlugin } from '@weblancer-ui/layout-manager';
import { undoPlugin } from '@weblancer-ui/undo-plugin';

export function getWeblancerDefaultPlugin() {
  return [
    breakpointUiPlugin,
    adjustmentPlugin,
    inspectorPlugin,
    layoutPlugin,
    componentPlugin,
    undoPlugin,
    extraAdjustmentPlugin,
  ];
}
