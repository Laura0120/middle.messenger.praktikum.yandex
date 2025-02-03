export function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}
export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}

export function isEqual(lhs: unknown, rhs: unknown): boolean {
  if (typeof lhs !== typeof rhs) {
    return false;
  } else if (isObject(lhs) && isObject(rhs)) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
      return false;
    }

    for (const [key] of Object.entries(lhs)) {
      if (Object.prototype.hasOwnProperty.call(lhs, key) && Object.prototype.hasOwnProperty.call(lhs, key)) {
        if (!isEqual(lhs[key], rhs[key])) {
          return false;
        }
      } else {
        return false;
      }
    }
  } else if (isArray(lhs) && isArray(rhs)) {
    if (lhs.length !== rhs.length) {
      return false;
    }

    for (const [index, value] of lhs.entries()) {
      if (!isEqual(value, rhs[index])) {
        return false;
      }
    }
  } else {
    return lhs === rhs;
  }

  return true;
}
