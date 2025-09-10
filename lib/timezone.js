import dayjs from 'dayjs';
import { getConfig } from './config';
export function convertTimezone(epoch, toTz) {
    const cfg = getConfig();
    const d = dayjs.unix(epoch).tz(cfg.defaultTimezone);
    return d.tz(toTz).unix();
}
export function startOfDay(epoch, tz) {
    const cfg = getConfig();
    return dayjs
        .unix(epoch)
        .tz(tz || cfg.defaultTimezone)
        .startOf('day')
        .unix();
}
export function endOfDay(epoch, tz) {
    const cfg = getConfig();
    return dayjs
        .unix(epoch)
        .tz(tz || cfg.defaultTimezone)
        .endOf('day')
        .unix();
}
