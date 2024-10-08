// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

export const debounce = <T extends AnyFunction>(
  func: T,
  timeout = 300
): ((...args: Parameters<T>) => void) => {
  let timer: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
