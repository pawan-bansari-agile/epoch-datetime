export interface EpochConfig {
    defaultFormat: string;
    defaultTimezone: string;
    use12Hour: boolean;
}
export declare function setConfig(newConfig: Partial<EpochConfig>): void;
export declare function getConfig(): EpochConfig;
