import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { PropManager } from '../prop-manager';
import { IPropManagerActions } from '../types';

export class UpdateComponentAction extends EditorAction {
  public subject = 'Update Component';

  public get description() {
    return 'Update Component';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(PropManager) public propManager: IPropManagerActions
  ) {
    super(undoManager);
  }

  private id!: string;
  private name!: string;
  private value!: unknown;
  private oldValue!: unknown;
  prepare(id: string, name: string, value: unknown) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.oldValue = this.propManager.getComponent(id)?.props[name].value;

    return this;
  }

  public override execute(): void {
    this.propManager.updateComponentProp(this.id, this.name, this.value);
  }

  public override undo(): void {
    this.propManager.updateComponentProp(this.id, this.name, this.oldValue);
  }
}

EditorAction.bindAction(UpdateComponentAction);
