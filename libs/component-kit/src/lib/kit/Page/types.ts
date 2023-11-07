export interface ISectionProps {
  sectionData: ISectionData;
  handleSectionUp(): void;
  handleSectionDown(): void;
}

export interface ISectionData {
  gridArea: {
    rowStart: number;
    columnStart: number;
    rowEnd: number;
    columnEnd: number;
  };
}
