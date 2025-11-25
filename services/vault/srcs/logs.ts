import fs from 'fs'

export function log(message: string, level: 'info' | 'warn' | 'error') {
    // const logMessage = `[Vault] [${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`;
    const logMessage = JSON.stringify({container_name: "vault", timestamp: new Date().toISOString(), level: level.toUpperCase(), message: message});
    fs.writeFileSync("/app/logs/vault.log", logMessage, { flag: 'a' })
    fs.writeFileSync("/app/logs/vault.log", "\n", { flag: 'a' })
}