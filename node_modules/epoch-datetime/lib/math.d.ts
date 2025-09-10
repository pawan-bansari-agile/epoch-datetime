import dayjs from 'dayjs';
export declare function add(epoch: number, amount: number, unit: dayjs.ManipulateType): number;
export declare function subtract(epoch: number, amount: number, unit: dayjs.ManipulateType): number;
export declare function clamp(epoch: number, min: number, max: number): number;
export declare function round(epoch: number, unit: dayjs.OpUnitType): number;
