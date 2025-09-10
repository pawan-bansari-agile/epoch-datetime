// src/index.ts
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(customParseFormat);

export interface EpochConfig {
  defaultTimezone?: string;
  defaultFormat?: string;
  use12Hour?: boolean;
}

function normalizeFormatFor12h(fmt: string) {
  // If the format already contains 'A' or 'a', keep it.
  if (/\bA\b|\ba\b/.test(fmt)) return fmt;
  // Prefer hh over HH for 12-hour
  return (
    fmt.replace(/HH/g, 'hh') +
    (/\bmm\b/.test(fmt) && !fmt.includes('A') ? ' A' : '')
  );
}

export class EpochDateTime {
  private config: Required<EpochConfig>;

  constructor(config?: EpochConfig) {
    this.config = {
      defaultTimezone: config?.defaultTimezone || 'UTC',
      defaultFormat: config?.defaultFormat || 'YYYY-MM-DD HH:mm:ss',
      use12Hour: config?.use12Hour ?? false,
    };
  }

  toEpoch(date: string, time: string, tz?: string): number {
    const zone = tz || this.config.defaultTimezone;
    const input = `${date} ${time}`;

    // Try explicit 12h parse first (e.g. "2025-09-10 02:30 PM")
    let parsed = dayjs.tz(input, 'YYYY-MM-DD hh:mm A', zone);

    // If that fails, try 24h parse (e.g. "2025-09-10 14:30")
    if (!parsed.isValid()) {
      parsed = dayjs.tz(input, 'YYYY-MM-DD HH:mm', zone);
    }

    // Final tolerant fallback: let dayjs parse with tz (less strict)
    if (!parsed.isValid()) {
      // dayjs.tz accepts (dateString, timezone)
      parsed = dayjs.tz(input, zone);
    }

    if (!parsed.isValid()) {
      throw new Error(`Invalid input date/time: ${input}`);
    }

    return parsed.unix();
  }

  fromEpoch(epoch: number, tz?: string, formatOverride?: '12h' | '24h') {
    const zone = tz || this.config.defaultTimezone;
    const d = dayjs.unix(epoch).tz(zone);

    const use12 =
      typeof formatOverride !== 'undefined'
        ? formatOverride === '12h'
        : this.config.use12Hour;

    const date = d.format('YYYY-MM-DD');

    // If defaultFormat contains HH/HH:mm etc, respect the structure but toggle 12/24 hour part.
    let timeStr: string;
    if (use12) {
      // If defaultFormat contains HH -> convert to hh and add AM/PM if missing
      const fmt = normalizeFormatFor12h(this.config.defaultFormat);
      timeStr = d
        .format(fmt)
        .replace(/^[\s\S]*?(\d{1,2}:\d{2}(:\d{2})?(\s?[AP]M)?)$/, (m) => m);
      // Simpler: prefer explicit hh:mm A
      timeStr = d.format('hh:mm A');
    } else {
      timeStr = d.format('HH:mm');
    }

    return { date, time: timeStr };
  }

  formatEpoch(epoch: number, format?: string, tz?: string) {
    const zone = tz || this.config.defaultTimezone;

    // if explicit format provided, use it directly
    if (format) return dayjs.unix(epoch).tz(zone).format(format);

    // no explicit format: respect defaultFormat + use12Hour toggle
    let fmt = this.config.defaultFormat;
    if (this.config.use12Hour) {
      fmt = normalizeFormatFor12h(fmt);
    }
    return dayjs.unix(epoch).tz(zone).format(fmt);
  }

  difference(
    epoch1: number,
    epoch2: number,
    unit: dayjs.OpUnitType = 'second'
  ) {
    // Return absolute difference by default so API callers get positive numbers
    return Math.abs(dayjs.unix(epoch1).diff(dayjs.unix(epoch2), unit));
  }

  add(epoch: number, amount: number, unit: dayjs.ManipulateType) {
    return dayjs.unix(epoch).add(amount, unit).unix();
  }

  subtract(epoch: number, amount: number, unit: dayjs.ManipulateType) {
    return dayjs.unix(epoch).subtract(amount, unit).unix();
  }

  clamp(epoch: number, min: number, max: number) {
    return Math.min(Math.max(epoch, min), max);
  }

  round(epoch: number, unit: dayjs.OpUnitType) {
    return dayjs.unix(epoch).startOf(unit).unix();
  }

  startOfDay(epoch: number, tz?: string) {
    const zone = tz || this.config.defaultTimezone;
    return dayjs.unix(epoch).tz(zone).startOf('day').unix();
  }

  endOfDay(epoch: number, tz?: string) {
    const zone = tz || this.config.defaultTimezone;
    return dayjs.unix(epoch).tz(zone).endOf('day').unix();
  }

  isSameDay(epoch1: number, epoch2: number, tz?: string) {
    const zone = tz || this.config.defaultTimezone;
    return dayjs
      .unix(epoch1)
      .tz(zone)
      .isSame(dayjs.unix(epoch2).tz(zone), 'day');
  }
}

/* Backward compatibility: expose default singleton + helpers */
let defaultInstance = new EpochDateTime();

export const setConfig = (cfg: EpochConfig) => {
  defaultInstance = new EpochDateTime(cfg);
};

export const toEpoch = (...args: Parameters<EpochDateTime['toEpoch']>) =>
  defaultInstance.toEpoch(...args);
export const fromEpoch = (...args: Parameters<EpochDateTime['fromEpoch']>) =>
  defaultInstance.fromEpoch(...args);
export const formatEpoch = (
  ...args: Parameters<EpochDateTime['formatEpoch']>
) => defaultInstance.formatEpoch(...args);
export const difference = (...args: Parameters<EpochDateTime['difference']>) =>
  defaultInstance.difference(...args);
export const add = (...args: Parameters<EpochDateTime['add']>) =>
  defaultInstance.add(...args);
export const subtract = (...args: Parameters<EpochDateTime['subtract']>) =>
  defaultInstance.subtract(...args);
export const clamp = (...args: Parameters<EpochDateTime['clamp']>) =>
  defaultInstance.clamp(...args);
export const round = (...args: Parameters<EpochDateTime['round']>) =>
  defaultInstance.round(...args);
export const startOfDay = (...args: Parameters<EpochDateTime['startOfDay']>) =>
  defaultInstance.startOfDay(...args);
export const endOfDay = (...args: Parameters<EpochDateTime['endOfDay']>) =>
  defaultInstance.endOfDay(...args);
export const isSameDay = (...args: Parameters<EpochDateTime['isSameDay']>) =>
  defaultInstance.isSameDay(...args);
