import { mergeWith } from 'lodash';

export function deepAssign(object: unknown, source: unknown) {
  mergeWith(object, source, customizer);
}

function customizer(objValue: unknown, srcValue: unknown) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return;
}
