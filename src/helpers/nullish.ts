export function unwrap<T>(): T {
  throw "value is null/empty";
}

export function expect<T>(message: string): T {
  throw message;
}
