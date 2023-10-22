import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { StateManager } from '../state-manager';
import { IStateManagerActions } from '../types';
import { ITypeInfo } from '@weblancer-ui/types';

export class CreateStateActionFactory {
  constructor(
    @inject(UndoManager) public undoManager: IUndoManagerActions,
    @inject(StateManager) public stateManager: IStateManagerActions
  ) {}
}

export class UpdateStateAction extends EditorAction {
  public subject = 'Update State';

  public get description() {
    return 'Update State';
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

  private oldTypeInfo!: ITypeInfo;
  private oldDefaultValue?: unknown;
  public override execute(): void {
    const oldState = this.stateManager.getAllStates()[this.key];
    this.oldTypeInfo = oldState.typeInfo;
    this.oldDefaultValue = oldState.value;

    this.stateManager.createOrUpdateState(
      this.key,
      this.typeInfo,
      this.defaultValue
    );
  }

  public override undo(): void {
    this.stateManager.createOrUpdateState(
      this.key,
      this.oldTypeInfo,
      this.oldDefaultValue
    );
  }
}

EditorAction.bindAction(UpdateStateAction);
