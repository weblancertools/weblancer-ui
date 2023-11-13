export interface ISectionProps {
  sectionData: ISectionData;
  moveSection(sectionId: string, direction: MoveDirection): void;
}

export interface ISectionData {
  id: string;
  index: number;
  gridArea: {
    rowStart: number;
    columnStart: number;
    rowEnd: number;
    columnEnd: number;
  };
}

export type SectionIndexMap = Record<number, ISectionData>;
export type SectionIdMap = Record<string, ISectionData>;

export type MoveDirection = 'up' | 'down';
