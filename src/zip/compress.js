import {createGzip} from 'node:zlib';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

// const compress = async () => {
//     const __dirname = `${dirname(fileURLToPath(import.meta.url))}/files`;

//     const gzib = createGzip()
//     const targetFile = createReadStream(`${__dirname}/fileToCompress.txt`);
//     const archiveFile = createWriteStream(`${__dirname}/archive.gz`);

//     targetFile.pipe(gzib).pipe(archiveFile)
// };

const compress = async () => {
    const dirPath = join(import.meta.dirname, 'files');
    const readStr = createReadStream(join(dirPath, 'fileToCompress.txt'));
    const writeStr = createWriteStream(join(dirPath, 'archive.gz'))
    const gzip = createGzip();
    try {
        await pipeline(readStr, gzip, writeStr);
    } catch (error) {
        throw error;
    }
}

await compress();