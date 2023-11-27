/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { PropProvider } from '../propProvider/propProvider';

@importManager([UndoManager, PropProviderManager])
export class RemoveProviderAction extends EditorAction {
  public subject = 'Remove Provider';

  public get description() {
    return 'Remove Provider';
  }

  constructor(
    @inject(UndoManager) public undoManager: IUndoManagerActions,
    @inject(PropProviderManager) public propProvider: IPropProviderActions
  ) {
    super(undoManager);
  }

  private itemId!: string;
  private propName!: string;
  private providerId!: string;
  private propProviderClass!: string;
  private provider?: PropProvider;
  prepare(
    itemId: string,
    propName: string,
    providerId: string,
    propProviderClass: any
  ) {
    this.itemId = itemId;
    this.propName = propName;
    this.providerId = providerId;
    this.propProviderClass = propProviderClass;
    return this;
  }

  public override execute(): void {
    this.provider = this.propProvider
      .getItemPropProviders(this.itemId, this.propName)
      .find((provider) => provider.id === this.providerId)!;

    this.propProvider.removeProvider(
      this.itemId,
      this.propName,
      this.providerId
    );
  }

  public override undo(): void {
    if (this.provider)
      this.propProvider.addProvider(
        this.itemId,
        this.propName,
        this.propProviderClass,
        this.provider.key,
        this.provider.data,
        this.providerId
      );
  }
}
