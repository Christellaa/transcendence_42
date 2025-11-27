import fs from 'fs'

export function log(message: string, level: 'info' | 'warn' | 'error') {
    const logMessage = JSON.stringify({container_name: "database", timestamp: new Date().toISOString(), level: level.toUpperCase(), message: message});
    fs.writeFileSync("/app/logs/database.log", logMessage, { flag: 'a' })
    fs.writeFileSync("/app/logs/database.log", "\n", { flag: 'a' })
}