import dayjs from 'dayjs';

interface EpochConfig {
    defaultFormat: string;
    defaultTimezone: string;
    use12Hour: boolean;
}
declare function setConfig(newConfig: Partial<EpochConfig>): void;
declare function getConfig(): EpochConfig;

/** Convert input date+time+tz into epoch seconds */
declare function toEpoch(date: string, time: string, tz?: string): number;
/** Convert epoch back to date+time in given tz */
declare function fromEpoch(epoch: number, tz?: string): {
    date: string;
    time: string;
};

declare function formatEpoch(epoch: number, format?: string, tz?: string): string;

declare function convertTimezone(epoch: number, toTz: string): number;
declare function startOfDay(epoch: number, tz?: string): number;
declare function endOfDay(epoch: number, tz?: string): number;

declare function isSameDay(epoch1: number, epoch2: number, tz?: string): boolean;
declare function difference(epoch1: number, epoch2: number, unit?: dayjs.OpUnitType): number;

declare function add(epoch: number, amount: number, unit: dayjs.ManipulateType): number;
declare function subtract(epoch: number, amount: number, unit: dayjs.ManipulateType): number;
declare function clamp(epoch: number, min: number, max: number): number;
declare function round(epoch: number, unit: dayjs.OpUnitType): number;

export { type EpochConfig, add, clamp, convertTimezone, difference, endOfDay, formatEpoch, fromEpoch, getConfig, isSameDay, round, setConfig, startOfDay, subtract, toEpoch };
