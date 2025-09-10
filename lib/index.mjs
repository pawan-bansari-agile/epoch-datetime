// src/index.ts
import dayjs6 from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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
import dayjs from "dayjs";
function toEpoch(date, time, tz) {
  const cfg = getConfig();
  const dateTime = `${date} ${time}`;
  return dayjs.tz(dateTime, tz || cfg.defaultTimezone).unix();
}
function fromEpoch(epoch, tz) {
  const cfg = getConfig();
  const d = dayjs.unix(epoch).tz(tz || cfg.defaultTimezone);
  const timeFormat = cfg.use12Hour ? "hh:mm A" : "HH:mm";
  return {
    date: d.format("YYYY-MM-DD"),
    time: d.format(timeFormat)
  };
}

// src/formatting.ts
import dayjs2 from "dayjs";
function formatEpoch(epoch, format, tz) {
  const cfg = getConfig();
  const d = dayjs2.unix(epoch).tz(tz || cfg.defaultTimezone);
  return d.format(format || cfg.defaultFormat);
}

// src/timezone.ts
import dayjs3 from "dayjs";
function convertTimezone(epoch, toTz) {
  const cfg = getConfig();
  const d = dayjs3.unix(epoch).tz(cfg.defaultTimezone);
  return d.tz(toTz).unix();
}
function startOfDay(epoch, tz) {
  const cfg = getConfig();
  return dayjs3.unix(epoch).tz(tz || cfg.defaultTimezone).startOf("day").unix();
}
function endOfDay(epoch, tz) {
  const cfg = getConfig();
  return dayjs3.unix(epoch).tz(tz || cfg.defaultTimezone).endOf("day").unix();
}

// src/comparisons.ts
import dayjs4 from "dayjs";
function isSameDay(epoch1, epoch2, tz) {
  const cfg = getConfig();
  const d1 = dayjs4.unix(epoch1).tz(tz || cfg.defaultTimezone);
  const d2 = dayjs4.unix(epoch2).tz(tz || cfg.defaultTimezone);
  return d1.isSame(d2, "day");
}
function difference(epoch1, epoch2, unit = "second") {
  return dayjs4.unix(epoch1).diff(dayjs4.unix(epoch2), unit);
}

// src/math.ts
import dayjs5 from "dayjs";
function add(epoch, amount, unit) {
  return dayjs5.unix(epoch).add(amount, unit).unix();
}
function subtract(epoch, amount, unit) {
  return dayjs5.unix(epoch).subtract(amount, unit).unix();
}
function clamp(epoch, min, max) {
  return Math.min(Math.max(epoch, min), max);
}
function round(epoch, unit) {
  return dayjs5.unix(epoch).startOf(unit).unix();
}

// src/index.ts
dayjs6.extend(utc);
dayjs6.extend(timezone);
export {
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
};
