import dayjs from 'dayjs';
import { getConfig } from './config';

export function isSameDay(
  epoch1: number,
  epoch2: number,
  tz?: string
): boolean {
  const cfg = getConfig();
  const d1 = dayjs.unix(epoch1).tz(tz || cfg.defaultTimezone);
  const d2 = dayjs.unix(epoch2).tz(tz || cfg.defaultTimezone);
  return d1.isSame(d2, 'day');
}

export function difference(
  epoch1: number,
  epoch2: number,
  unit: dayjs.OpUnitType = 'second'
): number {
  return dayjs.unix(epoch1).diff(dayjs.unix(epoch2), unit);
}
