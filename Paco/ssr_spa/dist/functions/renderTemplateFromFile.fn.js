import { readFile } from 'fs/promises';
import { join as pathJoin } from 'path';
import __dirname from './dirname.fn.js';
import { parseHTML } from 'linkedom';
const template = await readFile(pathJoin(__dirname, '../../srcs/pages', 'template.html'), { encoding: 'utf8' });
console.log(template);
export async function renderTemplateFromFile(filename) {
    return new Promise(async (resolve, reject) => {
        const filePath = pathJoin(__dirname, '../../srcs/pages', filename);
        let content = await readFile(filePath, { encoding: 'utf8' }).catch(() => null);
        if (content == null)
            return reject();
        let { document } = parseHTML(content);
        const title = document.querySelector('title')?.innerHTML;
        const style = document.querySelector('style')?.innerHTML;
        const script = document.querySelector('script')?.innerHTML;
        const body = document.querySelector('page')?.innerHTML;
        console.log("Title: ", title);
        console.log("Style: ", style);
        console.log("Script: ", script);
        console.log("Body: ", body);
        resolve(content);
    });
}
//# sourceMappingURL=renderTemplateFromFile.fn.js.map