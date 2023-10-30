/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { PropManager } from '../prop-manager';
import { IComponentData, IPropManagerActions } from '../types';

export class RemoveComponentAction extends EditorAction {
  public subject = 'Remove Component';

  public get description() {
    return 'Remove Component';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(PropManager) public propManager: IPropManagerActions
  ) {
    super(undoManager);
  }

  private componentData!: IComponentData;
  prepare(id: string) {
    this.componentData = this.propManager.getComponent(id)!;

    if (!this.componentData) throw new Error('Component not found');

    return this;
  }

  public override execute(): void {
    this.propManager.removeComponent(this.componentData.id);
  }

  public override undo(): void {
    this.propManager.addComponent(this.componentData);
  }
}

EditorAction.bindAction(RemoveComponentAction);
