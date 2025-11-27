import fs from 'fs'

export function log(message: string, level: 'info' | 'warn' | 'error') {
    const logMessage = JSON.stringify({container_name: "waf", timestamp: new Date().toISOString(), level: level.toUpperCase(), message: message});
    fs.writeFileSync("/app/logs/waf.log", logMessage, { flag: 'a' })
    fs.writeFileSync("/app/logs/waf.log", "\n", { flag: 'a' })
}