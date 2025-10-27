import { readFile } from 'fs/promises';
import { join as pathJoin } from 'path';
import __dirname from './dirname.fn.js';
import { parseHTML } from 'linkedom';
const template = await readFile(pathJoin(__dirname, '../../srcs/pages', 'template.html'), { encoding: 'utf8' });
export async function renderTemplateFromFile(filename) {
    return new Promise(async (resolve, reject) => {
        const filePath = pathJoin(__dirname, '../../srcs/pages', filename);
        let content = await readFile(filePath, { encoding: 'utf8' }).catch(() => null);
        if (content == null)
            return reject();
        let { document } = parseHTML(content);
        const title = document.querySelector('title')?.innerHTML;
        const style = document.querySelector('style')?.outerHTML;
        const script = document.querySelector('script')?.outerHTML;
        const body = document.querySelector('page')?.outerHTML;
        let final = '' + template;
        final = final.replace('{{body}}', body);
        final = final.replace('{{style}}', style);
        final = final.replace('{{title}}', title);
        final = final.replace('{{script}}', script || '');
        resolve(final);
    });
}
//# sourceMappingURL=renderTemplateFromFile.fn.js.map