"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  EpochDateTime: () => EpochDateTime,
  add: () => add,
  clamp: () => clamp,
  difference: () => difference,
  endOfDay: () => endOfDay,
  formatEpoch: () => formatEpoch,
  fromEpoch: () => fromEpoch,
  isSameDay: () => isSameDay,
  round: () => round,
  setConfig: () => setConfig,
  startOfDay: () => startOfDay,
  subtract: () => subtract,
  toEpoch: () => toEpoch
});
module.exports = __toCommonJS(index_exports);
var import_dayjs = __toESM(require("dayjs"));
var import_utc = __toESM(require("dayjs/plugin/utc"));
var import_timezone = __toESM(require("dayjs/plugin/timezone"));
var import_customParseFormat = __toESM(require("dayjs/plugin/customParseFormat"));
import_dayjs.default.extend(import_utc.default);
import_dayjs.default.extend(import_timezone.default);
import_dayjs.default.extend(import_customParseFormat.default);
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
    let parsed = import_dayjs.default.tz(input, "YYYY-MM-DD hh:mm A", zone);
    if (!parsed.isValid()) {
      parsed = import_dayjs.default.tz(input, "YYYY-MM-DD HH:mm", zone);
    }
    if (!parsed.isValid()) {
      parsed = import_dayjs.default.tz(input, zone);
    }
    if (!parsed.isValid()) {
      throw new Error(`Invalid input date/time: ${input}`);
    }
    return parsed.unix();
  }
  fromEpoch(epoch, tz2, formatOverride) {
    const zone = tz2 || this.config.defaultTimezone;
    const d = import_dayjs.default.unix(epoch).tz(zone);
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
    if (format) return import_dayjs.default.unix(epoch).tz(zone).format(format);
    let fmt = this.config.defaultFormat;
    if (this.config.use12Hour) {
      fmt = normalizeFormatFor12h(fmt);
    }
    return import_dayjs.default.unix(epoch).tz(zone).format(fmt);
  }
  difference(epoch1, epoch2, unit = "second") {
    return Math.abs(import_dayjs.default.unix(epoch1).diff(import_dayjs.default.unix(epoch2), unit));
  }
  add(epoch, amount, unit) {
    return import_dayjs.default.unix(epoch).add(amount, unit).unix();
  }
  subtract(epoch, amount, unit) {
    return import_dayjs.default.unix(epoch).subtract(amount, unit).unix();
  }
  clamp(epoch, min, max) {
    return Math.min(Math.max(epoch, min), max);
  }
  round(epoch, unit) {
    return import_dayjs.default.unix(epoch).startOf(unit).unix();
  }
  startOfDay(epoch, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    return import_dayjs.default.unix(epoch).tz(zone).startOf("day").unix();
  }
  endOfDay(epoch, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    return import_dayjs.default.unix(epoch).tz(zone).endOf("day").unix();
  }
  isSameDay(epoch1, epoch2, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    return import_dayjs.default.unix(epoch1).tz(zone).isSame(import_dayjs.default.unix(epoch2).tz(zone), "day");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
