// src/index.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(tz);
var EpochDateTime = class {
  constructor(config) {
    this.config = {
      defaultTimezone: config?.defaultTimezone || "UTC",
      defaultFormat: config?.defaultFormat || "YYYY-MM-DD HH:mm",
      use12Hour: config?.use12Hour ?? false
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
  toEpoch(date, time, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    const input = `${date} ${time}`;
    let parsed = dayjs.tz(input, "YYYY-MM-DD hh:mm A", zone);
    if (!parsed.isValid()) {
      parsed = dayjs.tz(input, "YYYY-MM-DD HH:mm", zone);
    }
    if (!parsed.isValid()) throw new Error(`Invalid input: ${date} ${time}`);
    return parsed.unix();
  }
  fromEpoch(epoch, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    const format = this.config.use12Hour ? "hh:mm A" : "HH:mm";
    const d = dayjs.unix(epoch).tz(zone);
    return {
      date: d.format("YYYY-MM-DD"),
      time: d.format(format)
    };
  }
  formatEpoch(epoch, format, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    const fmt = format || this.config.defaultFormat;
    return dayjs.unix(epoch).tz(zone).format(fmt);
  }
  difference(epoch1, epoch2, unit = "second") {
    return dayjs.unix(epoch1).diff(dayjs.unix(epoch2), unit);
  }
  add(epoch, amount, unit) {
    return dayjs.unix(epoch).add(amount, unit).unix();
  }
  subtract(epoch, amount, unit) {
    return dayjs.unix(epoch).subtract(amount, unit).unix();
  }
  clamp(epoch, min, max) {
    return Math.min(Math.max(epoch, min), max);
  }
  round(epoch, unit) {
    return dayjs.unix(epoch).startOf(unit).unix();
  }
  startOfDay(epoch, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    return dayjs.unix(epoch).tz(zone).startOf("day").unix();
  }
  endOfDay(epoch, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    return dayjs.unix(epoch).tz(zone).endOf("day").unix();
  }
  isSameDay(epoch1, epoch2, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    return dayjs.unix(epoch1).tz(zone).isSame(dayjs.unix(epoch2).tz(zone), "day");
  }
};
var defaultInstance = new EpochDateTime();
var setConfig = (cfg) => {
  defaultInstance = new EpochDateTime(cfg);
};
var toEpoch = defaultInstance.toEpoch.bind(defaultInstance);
var fromEpoch = defaultInstance.fromEpoch.bind(defaultInstance);
var formatEpoch = defaultInstance.formatEpoch.bind(defaultInstance);
var difference = defaultInstance.difference.bind(defaultInstance);
var add = defaultInstance.add.bind(defaultInstance);
var subtract = defaultInstance.subtract.bind(defaultInstance);
var clamp = defaultInstance.clamp.bind(defaultInstance);
var round = defaultInstance.round.bind(defaultInstance);
var startOfDay = defaultInstance.startOfDay.bind(defaultInstance);
var endOfDay = defaultInstance.endOfDay.bind(defaultInstance);
var isSameDay = defaultInstance.isSameDay.bind(defaultInstance);
export {
  EpochDateTime,
  add,
  clamp,
  difference,
  endOfDay,
  formatEpoch,
  fromEpoch,
  isSameDay,
  round,
  setConfig,
  startOfDay,
  subtract,
  toEpoch
};
