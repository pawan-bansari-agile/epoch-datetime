let config = {
    defaultFormat: 'YYYY-MM-DD HH:mm:ss',
    defaultTimezone: 'UTC',
    use12Hour: false,
};
export function setConfig(newConfig) {
    config = { ...config, ...newConfig };
}
export function getConfig() {
    return config;
}
