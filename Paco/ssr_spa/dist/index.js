import Fastify from 'fastify';
import path from 'path';
import { readFile } from 'fs/promises';
import fastifyStatic from '@fastify/static';
import { renderTemplateFromFile } from './functions/renderTemplateFromFile.fn.js';
const fastify = Fastify();
const __dirname = path.resolve();
const validRoutes = ['index', 'about'];
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/'
});
async function getHTML(route, type) {
    return new Promise(async (resolve, reject) => {
        let page;
        if (type === 'hydrate') {
            const filePath = path.join(__dirname, 'srcs/pages', `${route}.html`);
            page = await readFile(filePath, 'utf8').catch(() => reject(null));
        }
        else {
            page = await renderTemplateFromFile(`${route}.html`).catch(() => reject(null));
        }
        resolve(page);
    });
}
fastify.route({
    method: 'GET',
    url: '/*',
    exposeHeadRoute: false,
    handler: async (req, reply) => {
        let route = req.params['*'] || '';
        const type = req.headers.type;
        if (route === '')
            route = 'index';
        if (validRoutes.includes(route)) {
            const html = await getHTML(route, type).catch(() => {
                return reply.status(404).send();
            });
            reply.type('text/html').send(html);
        }
        else
            reply.status(404).send();
    }
});
const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log('Server running on http://localhost:3000');
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map