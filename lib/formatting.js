import dayjs from 'dayjs';
import { getConfig } from './config';
export function formatEpoch(epoch, format, tz) {
    const cfg = getConfig();
    const d = dayjs.unix(epoch).tz(tz || cfg.defaultTimezone);
    return d.format(format || cfg.defaultFormat);
}
