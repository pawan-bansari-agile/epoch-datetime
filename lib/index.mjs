// src/index.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(customParseFormat);
function normalizeFormatFor12h(fmt) {
  if (/\bA\b|\ba\b/.test(fmt)) return fmt;
  return fmt.replace(/HH/g, "hh") + (/\bmm\b/.test(fmt) && !fmt.includes("A") ? " A" : "");
}
var EpochDateTime = class {
  constructor(config) {
    this.config = {
      defaultTimezone: config?.defaultTimezone || "UTC",
      defaultFormat: config?.defaultFormat || "YYYY-MM-DD HH:mm:ss",
      use12Hour: config?.use12Hour ?? false
    };
  }
  toEpoch(date, time, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    const input = `${date} ${time}`;
    let parsed = dayjs.tz(input, "YYYY-MM-DD hh:mm A", zone);
    if (!parsed.isValid()) {
      parsed = dayjs.tz(input, "YYYY-MM-DD HH:mm", zone);
    }
    if (!parsed.isValid()) {
      parsed = dayjs.tz(input, zone);
    }
    if (!parsed.isValid()) {
      throw new Error(`Invalid input date/time: ${input}`);
    }
    return parsed.unix();
  }
  fromEpoch(epoch, tz2, formatOverride) {
    const zone = tz2 || this.config.defaultTimezone;
    const d = dayjs.unix(epoch).tz(zone);
    const use12 = typeof formatOverride !== "undefined" ? formatOverride === "12h" : this.config.use12Hour;
    const date = d.format("YYYY-MM-DD");
    let timeStr;
    if (use12) {
      const fmt = normalizeFormatFor12h(this.config.defaultFormat);
      timeStr = d.format(fmt).replace(/^[\s\S]*?(\d{1,2}:\d{2}(:\d{2})?(\s?[AP]M)?)$/, (m) => m);
      timeStr = d.format("hh:mm A");
    } else {
      timeStr = d.format("HH:mm");
    }
    return { date, time: timeStr };
  }
  formatEpoch(epoch, format, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    if (format) return dayjs.unix(epoch).tz(zone).format(format);
    let fmt = this.config.defaultFormat;
    if (this.config.use12Hour) {
      fmt = normalizeFormatFor12h(fmt);
    }
    return dayjs.unix(epoch).tz(zone).format(fmt);
  }
  difference(epoch1, epoch2, unit = "second") {
    return Math.abs(dayjs.unix(epoch1).diff(dayjs.unix(epoch2), unit));
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
var toEpoch = (...args) => defaultInstance.toEpoch(...args);
var fromEpoch = (...args) => defaultInstance.fromEpoch(...args);
var formatEpoch = (...args) => defaultInstance.formatEpoch(...args);
var difference = (...args) => defaultInstance.difference(...args);
var add = (...args) => defaultInstance.add(...args);
var subtract = (...args) => defaultInstance.subtract(...args);
var clamp = (...args) => defaultInstance.clamp(...args);
var round = (...args) => defaultInstance.round(...args);
var startOfDay = (...args) => defaultInstance.startOfDay(...args);
var endOfDay = (...args) => defaultInstance.endOfDay(...args);
var isSameDay = (...args) => defaultInstance.isSameDay(...args);
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
