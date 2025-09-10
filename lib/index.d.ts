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
    fromEpoch(epoch: number, tz?: string): {
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
declare const toEpoch: (date: string, time: string, tz?: string) => number;
declare const fromEpoch: (epoch: number, tz?: string) => {
    date: string;
    time: string;
};
declare const formatEpoch: (epoch: number, format?: string, tz?: string) => string;
declare const difference: (epoch1: number, epoch2: number, unit?: dayjs.OpUnitType) => number;
declare const add: (epoch: number, amount: number, unit: dayjs.ManipulateType) => number;
declare const subtract: (epoch: number, amount: number, unit: dayjs.ManipulateType) => number;
declare const clamp: (epoch: number, min: number, max: number) => number;
declare const round: (epoch: number, unit: dayjs.OpUnitType) => number;
declare const startOfDay: (epoch: number, tz?: string) => number;
declare const endOfDay: (epoch: number, tz?: string) => number;
declare const isSameDay: (epoch1: number, epoch2: number, tz?: string) => boolean;

export { type EpochConfig, EpochDateTime, add, clamp, difference, endOfDay, formatEpoch, fromEpoch, isSameDay, round, setConfig, startOfDay, subtract, toEpoch };
