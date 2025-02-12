type Indexed<T = unknown> = {
  [key in string]: T;
};
function isObject(obj: unknown): obj is Indexed {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  if (!isObject(lhs) || !isObject(rhs)) {
    throw new Error('Both arguments must be objects');
  }

  const target: Record<string, unknown> = { ...lhs };

  for (const key in rhs) {
    if (isObject(lhs[key]) && isObject(rhs[key])) {
      target[key] = merge(lhs[key], rhs[key]);
    } else {
      target[key] = rhs[key];
    }
  }

  return target;
}

export default merge;
