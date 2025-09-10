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
  //   fromEpoch(epoch: number, tz?: string) {
  //     const zone = tz || this.config.defaultTimezone;
  //     const format = this.config.use12Hour ? 'hh:mm A' : 'HH:mm';
  //     const d = dayjs.unix(epoch).tz(zone);
  //     return {
  //       date: d.format('YYYY-MM-DD'),
  //       time: d.format(format),
  //     };
  //   }
  fromEpoch(epoch, tz2, formatOverride) {
    const zone = tz2 || this.config.defaultTimezone;
    const d = import_dayjs.default.unix(epoch).tz(zone);
    const use12 = formatOverride ? formatOverride === "12h" : this.config.use12Hour;
    return {
      date: d.format("YYYY-MM-DD"),
      time: use12 ? d.format("hh:mm A") : d.format("HH:mm")
    };
  }
  formatEpoch(epoch, format, tz2) {
    const zone = tz2 || this.config.defaultTimezone;
    const fmt = format || this.config.defaultFormat;
    return import_dayjs.default.unix(epoch).tz(zone).format(fmt);
  }
  difference(epoch1, epoch2, unit = "second") {
    return import_dayjs.default.unix(epoch1).diff(import_dayjs.default.unix(epoch2), unit);
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
