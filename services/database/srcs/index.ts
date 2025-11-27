import initDb from "./services/sqlite.service.ts";
import { routes } from "./routes/handler.route.ts";
import { log } from "./logs.ts";

const PORT = 6989;
export const db = initDb();

async function main() {
    Bun.serve({
        port: PORT,
        routes,
        fetch() {
            return new Response("Page not Found", { status: 404 });
        }
    });
    log(`Listening on http://localhost:${PORT}`, 'info');
}

main();