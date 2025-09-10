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

export class EpochDateTime {
  private config: Required<EpochConfig>;

  constructor(config?: EpochConfig) {
    this.config = {
      defaultTimezone: config?.defaultTimezone || 'UTC',
      defaultFormat: config?.defaultFormat || 'YYYY-MM-DD HH:mm',
      use12Hour: config?.use12Hour ?? false,
    };
  }

  //   toEpoch(date: string, time: string, tz?: string): number {
  //     const zone = tz || this.config.defaultTimezone;

  //     // try both 12h and 24h parsing
  //     const input = `${date} ${time}`;
  //     const parsed =
  //       dayjs.tz(input, 'YYYY-MM-DD hh:mm A', zone, true) ||
  //       dayjs.tz(input, 'YYYY-MM-DD HH:mm', zone, true);

  //     if (!parsed.isValid()) throw new Error(`Invalid input: ${date} ${time}`);
  //     return parsed.unix();
  //   }
  //   toEpoch(date: string, time: string, tz?: string): number {
  //     const zone = tz || this.config.defaultTimezone;

  //     const input = `${date} ${time}`;
  //     let parsed = dayjs.tz(input, 'YYYY-MM-DD hh:mm A', zone);

  //     if (!parsed.isValid()) {
  //       parsed = dayjs.tz(input, 'YYYY-MM-DD HH:mm', zone);
  //     }

  //     if (!parsed.isValid()) throw new Error(`Invalid input: ${date} ${time}`);
  //     return parsed.unix();
  //   }
  toEpoch(date: string, time: string, tz?: string): number {
    const zone = tz || this.config.defaultTimezone;
    const input = `${date} ${time}`;

    // Try explicit 12h parse first
    let parsed = dayjs.tz(input, 'YYYY-MM-DD hh:mm A', zone);

    // If that fails, try 24h parse
    if (!parsed.isValid()) {
      parsed = dayjs.tz(input, 'YYYY-MM-DD HH:mm', zone);
    }

    // Final fallback: try parsing without format (not ideal but tolerant)
    if (!parsed.isValid()) {
      parsed = dayjs.tz(input, zone);
    }

    if (!parsed.isValid()) {
      throw new Error(`Invalid input date/time: ${input}`);
    }

    // Return unix epoch (seconds)
    return parsed.unix();
  }

  //   fromEpoch(epoch: number, tz?: string) {
  //     const zone = tz || this.config.defaultTimezone;
  //     const format = this.config.use12Hour ? 'hh:mm A' : 'HH:mm';
  //     const d = dayjs.unix(epoch).tz(zone);
  //     return {
  //       date: d.format('YYYY-MM-DD'),
  //       time: d.format(format),
  //     };
  //   }
  fromEpoch(epoch: number, tz?: string, formatOverride?: '12h' | '24h') {
    const zone = tz || this.config.defaultTimezone;
    const d = dayjs.unix(epoch).tz(zone);
    const use12 = formatOverride
      ? formatOverride === '12h'
      : this.config.use12Hour;
    return {
      date: d.format('YYYY-MM-DD'),
      time: use12 ? d.format('hh:mm A') : d.format('HH:mm'),
    };
  }

  formatEpoch(epoch: number, format?: string, tz?: string) {
    const zone = tz || this.config.defaultTimezone;
    const fmt = format || this.config.defaultFormat;
    return dayjs.unix(epoch).tz(zone).format(fmt);
  }

  difference(
    epoch1: number,
    epoch2: number,
    unit: dayjs.OpUnitType = 'second'
  ) {
    return dayjs.unix(epoch1).diff(dayjs.unix(epoch2), unit);
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

/**
 * Backward compatibility: default singleton + helpers
 */
let defaultInstance = new EpochDateTime();

export const setConfig = (cfg: EpochConfig) => {
  defaultInstance = new EpochDateTime(cfg);
};

// re-export methods bound to default instance
export const toEpoch = defaultInstance.toEpoch.bind(defaultInstance);
export const fromEpoch = defaultInstance.fromEpoch.bind(defaultInstance);
export const formatEpoch = defaultInstance.formatEpoch.bind(defaultInstance);
export const difference = defaultInstance.difference.bind(defaultInstance);
export const add = defaultInstance.add.bind(defaultInstance);
export const subtract = defaultInstance.subtract.bind(defaultInstance);
export const clamp = defaultInstance.clamp.bind(defaultInstance);
export const round = defaultInstance.round.bind(defaultInstance);
export const startOfDay = defaultInstance.startOfDay.bind(defaultInstance);
export const endOfDay = defaultInstance.endOfDay.bind(defaultInstance);
export const isSameDay = defaultInstance.isSameDay.bind(defaultInstance);
