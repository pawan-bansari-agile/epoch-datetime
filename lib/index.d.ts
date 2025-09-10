import dayjs from 'dayjs';

interface EpochConfig {
    defaultTimezone?: string;
    defaultFormat?: string;
    use12Hour?: boolean;
}
declare class EpochDateTime {
    private config;
    constructor(config?: EpochConfig);
    toEpoch(date: string, time: string, tz?: string): number;
    fromEpoch(epoch: number, tz?: string, formatOverride?: '12h' | '24h'): {
        date: string;
        time: string;
    };
    formatEpoch(epoch: number, format?: string, tz?: string): string;
    difference(epoch1: number, epoch2: number, unit?: dayjs.OpUnitType): number;
    add(epoch: number, amount: number, unit: dayjs.ManipulateType): number;
    subtract(epoch: number, amount: number, unit: dayjs.ManipulateType): number;
    clamp(epoch: number, min: number, max: number): number;
    round(epoch: number, unit: dayjs.OpUnitType): number;
    startOfDay(epoch: number, tz?: string): number;
    endOfDay(epoch: number, tz?: string): number;
    isSameDay(epoch1: number, epoch2: number, tz?: string): boolean;
}
declare const setConfig: (cfg: EpochConfig) => void;
declare const toEpoch: (...args: Parameters<EpochDateTime["toEpoch"]>) => number;
declare const fromEpoch: (...args: Parameters<EpochDateTime["fromEpoch"]>) => {
    date: string;
    time: string;
};
declare const formatEpoch: (...args: Parameters<EpochDateTime["formatEpoch"]>) => string;
declare const difference: (...args: Parameters<EpochDateTime["difference"]>) => number;
declare const add: (...args: Parameters<EpochDateTime["add"]>) => number;
declare const subtract: (...args: Parameters<EpochDateTime["subtract"]>) => number;
declare const clamp: (...args: Parameters<EpochDateTime["clamp"]>) => number;
declare const round: (...args: Parameters<EpochDateTime["round"]>) => number;
declare const startOfDay: (...args: Parameters<EpochDateTime["startOfDay"]>) => number;
declare const endOfDay: (...args: Parameters<EpochDateTime["endOfDay"]>) => number;
declare const isSameDay: (...args: Parameters<EpochDateTime["isSameDay"]>) => boolean;

export { type EpochConfig, EpochDateTime, add, clamp, difference, endOfDay, formatEpoch, fromEpoch, isSameDay, round, setConfig, startOfDay, subtract, toEpoch };
