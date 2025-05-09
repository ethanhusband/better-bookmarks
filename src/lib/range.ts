// creates an array of numbers between start and end - end is inclusive!
export function range(start: number, end: number) {
  const length = 1 + end - start;
  if (length < 0) {
    return [];
  }

  return Array.from({ length }, (_, i) => start + i);
}
