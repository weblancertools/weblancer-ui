import { ISectionData, MoveDirection, SectionIndexMap } from '../types';
import { ISectionManagerActions, SectionManagerService } from './types';
import { IManager } from '@weblancer-ui/types';
import { inject } from 'inversify';
import {
  ComponentManager,
  IComponentManagerActions,
} from '@weblancer-ui/component-manager';
import { SectionComponentKey } from '../constants';
import { IPropManagerActions, PropManager } from '@weblancer-ui/prop-manager';
import { Weblancer } from '@weblancer-ui/manager-registry';

export class SectionManager extends IManager implements ISectionManagerActions {
  public name = SectionManagerService;

  constructor(
    @inject(ComponentManager)
    private componentManager: IComponentManagerActions,
    @inject(PropManager) private propManager: IPropManagerActions
  ) {
    super();
  }

  addSection(
    index: number,
    sectionMap: SectionIndexMap,
    forceItemId?: string,
    onComplete?: (itemId: string) => void
  ): SectionIndexMap {
    const sectionId = this.componentManager.createItem(
      SectionComponentKey,
      this.propManager.getPageData().id,
      { x: 0, y: 0 },
      forceItemId,
      onComplete
    );

    const newSectionArray: ISectionData[] = new Array(
      Object.keys(sectionMap).length + 1
    )
      .fill({})
      .map((_, _index) => {
        if (_index < index) {
          return sectionMap[_index];
        } else {
          const sectionData = sectionMap[_index - 1];
          return {
            id: _index === index ? sectionId : sectionData.id,
            index: _index,
            gridArea: {
              columnStart: 1,
              columnEnd: 2,
              rowStart: _index + 1,
              rowEnd: _index + 2,
            },
          };
        }
      });

    const newSectionMap: SectionIndexMap = Object.fromEntries(
      newSectionArray.map((value, index) => [index, value])
    );

    return newSectionMap;
  }

  removeSection(
    sectionId: string,
    sectionMap: SectionIndexMap
  ): SectionIndexMap {
    const index = Object.values(sectionMap).findIndex(
      (section) => section.id === sectionId
    );

    this.componentManager.deleteItem(sectionId);

    const newSectionArray: ISectionData[] = new Array(
      Object.keys(sectionMap).length - 1
    )
      .fill({})
      .map((_, _index) => {
        if (_index < index) {
          return sectionMap[_index];
        } else {
          const sectionData = sectionMap[_index + 1];
          return {
            id: sectionData.id,
            index: _index,
            gridArea: {
              columnStart: 1,
              columnEnd: 2,
              rowStart: _index + 1,
              rowEnd: _index + 2,
            },
          };
        }
      });

    const newSectionMap: SectionIndexMap = Object.fromEntries(
      newSectionArray.map((value, index) => [index, value])
    );

    return newSectionMap;
  }

  moveSection(
    sectionId: string,
    direction: MoveDirection,
    sectionMap: SectionIndexMap
  ): SectionIndexMap {
    const index = Object.values(sectionMap).findIndex(
      (section) => section.id === sectionId
    );

    if (direction === 'up' && index === 0) return sectionMap;
    if (direction === 'down' && index === Object.keys(sectionMap).length - 1)
      return sectionMap;

    const switchIndex = direction === 'up' ? index - 1 : index + 1;

    const newSectionArray: ISectionData[] = new Array(
      Object.keys(sectionMap).length
    )
      .fill({})
      .map((_, _index) => {
        if (_index === index) {
          return {
            id: sectionMap[switchIndex].id,
            index: _index,
            gridArea: sectionMap[index].gridArea,
          };
        }
        if (_index === switchIndex) {
          return {
            id: sectionMap[index].id,
            index: _index,
            gridArea: sectionMap[switchIndex].gridArea,
          };
        }
        return sectionMap[index];
      });

    const newSectionMap: SectionIndexMap = Object.fromEntries(
      newSectionArray.map((value, index) => [index, value])
    );

    return newSectionMap;
  }
}

Weblancer.registerManager<ISectionManagerActions>(SectionManager);
