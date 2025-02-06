export default function (value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}
