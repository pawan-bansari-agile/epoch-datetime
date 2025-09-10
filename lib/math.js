import dayjs from 'dayjs';
export function add(epoch, amount, unit) {
    return dayjs.unix(epoch).add(amount, unit).unix();
}
export function subtract(epoch, amount, unit) {
    return dayjs.unix(epoch).subtract(amount, unit).unix();
}
export function clamp(epoch, min, max) {
    return Math.min(Math.max(epoch, min), max);
}
export function round(epoch, unit) {
    return dayjs.unix(epoch).startOf(unit).unix();
}
