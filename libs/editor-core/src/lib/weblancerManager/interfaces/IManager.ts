export interface IManager {
  name: string;
  init(managers: IManager[]): void;
}
