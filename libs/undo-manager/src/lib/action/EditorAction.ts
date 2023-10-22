import { inject, injectable } from 'inversify';
import { IUndoManagerActions } from '../types';
import { UndoManager } from '../undo-manager';
import { weblancerContainer } from '@weblancer-ui/manager-registry';

@injectable()
export abstract class EditorAction {
  public abstract subject: string;
  public abstract get description(): string;
  constructor(@inject(UndoManager) public undoManager: IUndoManagerActions) {}

  public abstract execute(): void;
  public abstract undo(): void;

  public perform() {
    this.undoManager.registerAndExecuteAction(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract prepare(...args: any[]): EditorAction;

  public static getActionInstance<Type>(_actionClass: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): Type;
  }) {
    return weblancerContainer.get<Type>(_actionClass);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static bindAction(_actionClass: any) {
    weblancerContainer.bind(_actionClass).toSelf();
  }
}
