/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Weblancer } from '@weblancer-ui/manager-registry';
import { IManager } from '@weblancer-ui/types';

export function importManager(
  _class:
    | (new (...args: any[]) => IManager)
    | (new (...args: any[]) => IManager)[]
) {
  return function (target: any) {
    Reflect.defineMetadata('dependencies', _class, target);
  };
}
