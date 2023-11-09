import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { PropManager } from '../prop-manager';
import { IPropManagerActions } from '../types';
import { IComponentData } from '@weblancer-ui/types';

export class AddComponentAction extends EditorAction {
  public subject = 'Add Component';

  public get description() {
    return 'Add Component';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(PropManager) public propManager: IPropManagerActions
  ) {
    super(undoManager);
  }

  private componentData!: IComponentData;
  prepare(componentData: IComponentData) {
    this.componentData = componentData;

    return this;
  }

  public override execute(): void {
    this.propManager.addComponent(this.componentData);
  }

  public override undo(): void {
    this.propManager.removeComponent(this.componentData.id);
  }
}

EditorAction.bindAction(AddComponentAction);
