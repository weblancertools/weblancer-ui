import {
  EditorAction,
  IUndoManagerActions,
  UndoManager,
} from '@weblancer-ui/undo-manager';
import { inject, injectable } from 'inversify';
import { SectionManager } from '../sectionManager';
import { ISectionManagerActions } from '../types';
import { SectionIndexMap } from '../../types';
import {
  AdjustmentManager,
  IAdjustmentManagerActions,
} from '@weblancer-ui/adjustment-manager';
import { SectionMapPropName } from '../../constants';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { importManager } from '@weblancer-ui/utils';

@injectable()
@importManager([UndoManager, SectionManager, PropManager, AdjustmentManager])
export class AddSectionAction extends EditorAction {
  public subject = 'Create Item';

  public get description() {
    return 'Create Item';
  }

  constructor(
    @inject(UndoManager) public override undoManager: IUndoManagerActions,
    @inject(SectionManager) public sectionManager: ISectionManagerActions,
    @inject(PropManager) public propManager: IPropManagerActions,
    @inject(AdjustmentManager)
    public adjustmentManager: IAdjustmentManagerActions
  ) {
    super(undoManager);
  }

  private index!: number;
  private sectionMap!: SectionIndexMap;
  private itemId!: string;
  private oldSelectedItemId?: string | null;
  prepare(index: number, sectionMap: SectionIndexMap) {
    this.index = index;
    this.sectionMap = sectionMap;
    return this;
  }

  public override execute(): void {
    this.oldSelectedItemId = this.adjustmentManager.getSelectedItemId();
    this.sectionMap = this.sectionManager.addSection(
      this.index,
      this.sectionMap,
      this.itemId,
      (itemId) => {
        this.itemId = itemId;
        this.adjustmentManager.setSelectedItemId(itemId);
      }
    );

    this.propManager.updateComponentProp(
      this.propManager.getPageData().id,
      SectionMapPropName,
      this.sectionMap,
      true
    );
  }

  public override undo(): void {
    this.sectionMap = this.sectionManager.removeSection(
      this.itemId,
      this.sectionMap
    );

    this.propManager.updateComponentProp(
      this.propManager.getPageData().id,
      SectionMapPropName,
      this.sectionMap,
      true
    );

    this.adjustmentManager.setSelectedItemId(this.oldSelectedItemId ?? null);
  }
}

EditorAction.bindAction(AddSectionAction);
