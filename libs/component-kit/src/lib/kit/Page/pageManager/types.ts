import { MoveDirection, SectionIndexMap } from '../types';

export const SectionManagerService = 'SectionManager';

export interface ISectionManagerActions {
  addSection(index: number, sectionMap: SectionIndexMap): SectionIndexMap;
  removeSection(
    sectionId: string,
    sectionMap: SectionIndexMap
  ): SectionIndexMap;
  moveSection(
    sectionId: string,
    direction: MoveDirection,
    sectionMap: SectionIndexMap
  ): SectionIndexMap;
}
