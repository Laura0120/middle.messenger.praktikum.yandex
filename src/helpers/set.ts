import { isObject } from './isEqual';
import merge from './merge';
type StringIndexed<T = unknown> = {
  [key: string]: T;
};
export function pathToObjectWithValue(path: string, value: unknown) {
  const propList = path.split('.');
  return propList.reduceRight((accumulator, currentValue) => ({ [currentValue]: accumulator }), value);
}

export function set(object: StringIndexed | unknown, path: string, value: unknown): StringIndexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (isObject(object)) {
    const objectByPath = pathToObjectWithValue(path, value);
    return merge(object, objectByPath as StringIndexed);
  } else {
    return object;
  }
}
