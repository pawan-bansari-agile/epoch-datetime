import dayjs from 'dayjs';
import { getConfig } from './config';

export function formatEpoch(
  epoch: number,
  format?: string,
  tz?: string
): string {
  const cfg = getConfig();
  const d = dayjs.unix(epoch).tz(tz || cfg.defaultTimezone);
  return d.format(format || cfg.defaultFormat);
}
