/** Convert input date+time+tz into epoch seconds */
export declare function toEpoch(date: string, time: string, tz?: string): number;
/** Convert epoch back to date+time in given tz */
export declare function fromEpoch(epoch: number, tz?: string): {
    date: string;
    time: string;
};
