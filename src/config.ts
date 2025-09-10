export interface EpochConfig {
  defaultFormat: string;
  defaultTimezone: string;
  use12Hour: boolean;
}

let config: EpochConfig = {
  defaultFormat: 'YYYY-MM-DD HH:mm:ss',
  defaultTimezone: 'UTC',
  use12Hour: false,
};

export function setConfig(newConfig: Partial<EpochConfig>) {
  config = { ...config, ...newConfig };
}

export function getConfig(): EpochConfig {
  return config;
}
