/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { importManager } from '@weblancer-ui/utils';
import { IPropProviderActions } from '../types';
import { PropProviderManager } from '../prop-provider-manager';

@importManager([UndoManager, PropProviderManager])
export class AddProviderAction extends EditorAction {
  public subject = 'Add Provider';

  public get description() {
    return 'Add Provider';
  }

  constructor(
    @inject(UndoManager) public undoManager: IUndoManagerActions,
    @inject(PropProviderManager) public propProvider: IPropProviderActions
  ) {
    super(undoManager);
  }

  private itemId!: string;
  private propName!: string;
  private propProviderClass!: any;
  private providerKey!: string;
  private data!: unknown;
  private providerId?: string;
  prepare(
    itemId: string,
    propName: string,
    propProviderClass: any,
    providerKey: string,
    data: unknown
  ) {
    this.itemId = itemId;
    this.propName = propName;
    this.propProviderClass = propProviderClass;
    this.providerKey = providerKey;
    this.data = data;
    return this;
  }

  public override execute(): void {
    this.providerId = this.propProvider.addProvider(
      this.itemId,
      this.propName,
      this.propProviderClass,
      this.providerKey,
      this.data
    );
  }

  public override undo(): void {
    if (this.providerId)
      this.propProvider.removeProvider(
        this.itemId,
        this.propName,
        this.providerId
      );
  }
}
