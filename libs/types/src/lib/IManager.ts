import { injectable } from 'inversify';

@injectable()
export abstract class IManager {
  public abstract name: string;
}
