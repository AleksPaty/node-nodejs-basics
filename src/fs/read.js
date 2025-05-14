import * as fs from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    const workPath = `${import.meta.dirname}/files`;
    try {
        let text = await fs.readFile(`${workPath}/fileToRead.txt`, {encoding: 'utf8'})
        text.split('\r\n').forEach(word => console.log(word))
    } catch {
        throw Error('FS operation failed')
    }
};

await read();