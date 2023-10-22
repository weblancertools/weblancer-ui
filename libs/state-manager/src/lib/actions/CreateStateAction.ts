import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { StateManager } from '../state-manager';
import { IStateManagerActions } from '../types';
import { ITypeInfo } from '@weblancer-ui/types';

export class CreateStateAction extends EditorAction {
  public subject = 'Create State';

  public get description() {
    return 'Create State';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(StateManager) public stateManager: IStateManagerActions
  ) {
    super(undoManager);
  }

  private key!: string;
  private typeInfo!: ITypeInfo;
  private defaultValue?: unknown;
  prepare(key: string, typeInfo: ITypeInfo, defaultValue?: unknown) {
    this.key = key;
    this.typeInfo = typeInfo;
    this.defaultValue = defaultValue;

    return this;
  }

  public override execute(): void {
    this.stateManager.createOrUpdateState(
      this.key,
      this.typeInfo,
      this.defaultValue
    );
  }

  public override undo(): void {
    this.stateManager.removeState(this.key);
  }
}

EditorAction.bindAction(CreateStateAction);
