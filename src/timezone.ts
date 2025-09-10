import dayjs from 'dayjs';
import { getConfig } from './config';

export function convertTimezone(epoch: number, toTz: string): number {
  const cfg = getConfig();
  const d = dayjs.unix(epoch).tz(cfg.defaultTimezone);
  return d.tz(toTz).unix();
}

export function startOfDay(epoch: number, tz?: string): number {
  const cfg = getConfig();
  return dayjs
    .unix(epoch)
    .tz(tz || cfg.defaultTimezone)
    .startOf('day')
    .unix();
}

export function endOfDay(epoch: number, tz?: string): number {
  const cfg = getConfig();
  return dayjs
    .unix(epoch)
    .tz(tz || cfg.defaultTimezone)
    .endOf('day')
    .unix();
}
