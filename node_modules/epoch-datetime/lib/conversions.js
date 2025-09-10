import dayjs from 'dayjs';
import { getConfig } from './config';
/** Convert input date+time+tz into epoch seconds */
export function toEpoch(date, time, tz) {
    const cfg = getConfig();
    const dateTime = `${date} ${time}`;
    return dayjs.tz(dateTime, tz || cfg.defaultTimezone).unix();
}
/** Convert epoch back to date+time in given tz */
export function fromEpoch(epoch, tz) {
    const cfg = getConfig();
    const d = dayjs.unix(epoch).tz(tz || cfg.defaultTimezone);
    const timeFormat = cfg.use12Hour ? 'hh:mm A' : 'HH:mm';
    return {
        date: d.format('YYYY-MM-DD'),
        time: d.format(timeFormat),
    };
}
