import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { StateManager } from '../state-manager';
import { IStateManagerActions } from '../types';
import { ITypeInfo } from '@weblancer-ui/types';

export class RemoveStateAction extends EditorAction {
  public subject = 'Remove State';

  public get description() {
    return 'Remove State';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(StateManager) public stateManager: IStateManagerActions
  ) {
    super(undoManager);
  }

  private key!: string;
  prepare(key: string) {
    this.key = key;

    return this;
  }

  private oldTypeInfo!: ITypeInfo;
  private oldValue?: unknown;
  public override execute(): void {
    const oldState = this.stateManager.getAllStates()[this.key];
    this.oldTypeInfo = oldState.typeInfo;
    this.oldValue = oldState.value;

    this.stateManager.removeState(this.key);
  }

  public override undo(): void {
    this.stateManager.createOrUpdateState(
      this.key,
      this.oldTypeInfo,
      this.oldValue
    );
  }
}

EditorAction.bindAction(RemoveStateAction);
