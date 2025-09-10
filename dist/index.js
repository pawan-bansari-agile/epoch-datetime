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
  add: () => add,
  clamp: () => clamp,
  convertTimezone: () => convertTimezone,
  difference: () => difference,
  endOfDay: () => endOfDay,
  formatEpoch: () => formatEpoch,
  fromEpoch: () => fromEpoch,
  getConfig: () => getConfig,
  isSameDay: () => isSameDay,
  round: () => round,
  setConfig: () => setConfig,
  startOfDay: () => startOfDay,
  subtract: () => subtract,
  toEpoch: () => toEpoch
});
module.exports = __toCommonJS(index_exports);
var import_dayjs6 = __toESM(require("dayjs"));
var import_utc = __toESM(require("dayjs/plugin/utc"));
var import_timezone = __toESM(require("dayjs/plugin/timezone"));

// src/config.ts
var config = {
  defaultFormat: "YYYY-MM-DD HH:mm:ss",
  defaultTimezone: "UTC",
  use12Hour: false
};
function setConfig(newConfig) {
  config = { ...config, ...newConfig };
}
function getConfig() {
  return config;
}

// src/conversions.ts
var import_dayjs = __toESM(require("dayjs"));
function toEpoch(date, time, tz) {
  const cfg = getConfig();
  const dateTime = `${date} ${time}`;
  return import_dayjs.default.tz(dateTime, tz || cfg.defaultTimezone).unix();
}
function fromEpoch(epoch, tz) {
  const cfg = getConfig();
  const d = import_dayjs.default.unix(epoch).tz(tz || cfg.defaultTimezone);
  const timeFormat = cfg.use12Hour ? "hh:mm A" : "HH:mm";
  return {
    date: d.format("YYYY-MM-DD"),
    time: d.format(timeFormat)
  };
}

// src/formatting.ts
var import_dayjs2 = __toESM(require("dayjs"));
function formatEpoch(epoch, format, tz) {
  const cfg = getConfig();
  const d = import_dayjs2.default.unix(epoch).tz(tz || cfg.defaultTimezone);
  return d.format(format || cfg.defaultFormat);
}

// src/timezone.ts
var import_dayjs3 = __toESM(require("dayjs"));
function convertTimezone(epoch, toTz) {
  const cfg = getConfig();
  const d = import_dayjs3.default.unix(epoch).tz(cfg.defaultTimezone);
  return d.tz(toTz).unix();
}
function startOfDay(epoch, tz) {
  const cfg = getConfig();
  return import_dayjs3.default.unix(epoch).tz(tz || cfg.defaultTimezone).startOf("day").unix();
}
function endOfDay(epoch, tz) {
  const cfg = getConfig();
  return import_dayjs3.default.unix(epoch).tz(tz || cfg.defaultTimezone).endOf("day").unix();
}

// src/comparisons.ts
var import_dayjs4 = __toESM(require("dayjs"));
function isSameDay(epoch1, epoch2, tz) {
  const cfg = getConfig();
  const d1 = import_dayjs4.default.unix(epoch1).tz(tz || cfg.defaultTimezone);
  const d2 = import_dayjs4.default.unix(epoch2).tz(tz || cfg.defaultTimezone);
  return d1.isSame(d2, "day");
}
function difference(epoch1, epoch2, unit = "second") {
  return import_dayjs4.default.unix(epoch1).diff(import_dayjs4.default.unix(epoch2), unit);
}

// src/math.ts
var import_dayjs5 = __toESM(require("dayjs"));
function add(epoch, amount, unit) {
  return import_dayjs5.default.unix(epoch).add(amount, unit).unix();
}
function subtract(epoch, amount, unit) {
  return import_dayjs5.default.unix(epoch).subtract(amount, unit).unix();
}
function clamp(epoch, min, max) {
  return Math.min(Math.max(epoch, min), max);
}
function round(epoch, unit) {
  return import_dayjs5.default.unix(epoch).startOf(unit).unix();
}

// src/index.ts
import_dayjs6.default.extend(import_utc.default);
import_dayjs6.default.extend(import_timezone.default);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  add,
  clamp,
  convertTimezone,
  difference,
  endOfDay,
  formatEpoch,
  fromEpoch,
  getConfig,
  isSameDay,
  round,
  setConfig,
  startOfDay,
  subtract,
  toEpoch
});
