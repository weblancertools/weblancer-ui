import { IManager } from '@weblancer-ui/types';
import { injectable } from 'inversify';
import { AdjustmentManagerService, IAdjustmentManagerActions } from './types';
import { weblancerRegistry } from '@weblancer-ui/manager-registry';

@injectable()
export class AdjustmentManager
  extends IManager
  implements IAdjustmentManagerActions
{
  public name = AdjustmentManagerService;
  public allRootRef: Record<string, React.RefObject<HTMLDivElement>> = {};
  private hoveredContainerId: string | null = null;
  private mouseOverItemId: string | null = null;
  private selectedItemId: string | null = null;
  private draggingItemId: string | null = null;

  addItemRootRef(
    itemId: string,
    rootRef: React.RefObject<HTMLDivElement>
  ): void {
    this.allRootRef[itemId] = rootRef;
  }

  setHoveredContainerId(itemId: string | null): void {
    this.hoveredContainerId = itemId;
  }

  getHoveredContainerId(): string | null {
    return this.hoveredContainerId;
  }

  setMouseOverItemId(itemId: string | null): void {
    this.mouseOverItemId = itemId;
  }

  getMouseOverItemId(): string | null {
    return this.mouseOverItemId;
  }

  setSelectedItemId(itemId: string | null): void {
    this.selectedItemId = itemId;
  }

  getSelectedItemId(): string | null {
    return this.selectedItemId;
  }

  setDraggingItemId(itemId: string | null): void {
    this.draggingItemId = itemId;
  }

  getDraggingItemId(): string | null {
    return this.draggingItemId;
  }
}

weblancerRegistry.registerManager<IAdjustmentManagerActions>(AdjustmentManager);
