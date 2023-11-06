import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject } from 'inversify';
import { PropManager } from '../prop-manager';
import { IPropManagerActions } from '../types';
import {
  BreakpointManager,
  IBreakpointManagerActions,
} from '@weblancer-ui/breakpoint-manager';

export class UpdateComponentPropAction extends EditorAction {
  public subject = 'Update Component Prop';

  public get description() {
    return 'Update Component Prop';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(PropManager) public propManager: IPropManagerActions,
    @inject(BreakpointManager)
    public breakpointManager: IBreakpointManagerActions
  ) {
    super(undoManager);
  }

  private id!: string;
  private name!: string;
  private newValue!: unknown;
  private oldValue!: unknown;
  prepare(id: string, name: string, newValue: unknown, oldValue?: unknown) {
    this.id = id;
    this.name = name;
    this.newValue = newValue;
    this.oldValue =
      oldValue !== undefined
        ? oldValue
        : this.propManager.getComponent(id)?.props[name][
            this.breakpointManager.getCurrentBreakpoint().id
          ]?.value;

    return this;
  }

  public override execute(): void {
    this.propManager.deepAssignComponentProp(this.id, this.name, this.newValue);
  }

  public override undo(): void {
    this.propManager.deepAssignComponentProp(this.id, this.name, this.oldValue);
  }
}

EditorAction.bindAction(UpdateComponentPropAction);
