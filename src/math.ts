import dayjs from 'dayjs';

export function add(
  epoch: number,
  amount: number,
  unit: dayjs.ManipulateType
): number {
  return dayjs.unix(epoch).add(amount, unit).unix();
}

export function subtract(
  epoch: number,
  amount: number,
  unit: dayjs.ManipulateType
): number {
  return dayjs.unix(epoch).subtract(amount, unit).unix();
}

export function clamp(epoch: number, min: number, max: number): number {
  return Math.min(Math.max(epoch, min), max);
}

export function round(epoch: number, unit: dayjs.OpUnitType): number {
  return dayjs.unix(epoch).startOf(unit).unix();
}
