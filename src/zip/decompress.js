import zlib from 'node:zlib';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

// const decompress = async () => {
//     const __dirname = `${dirname(fileURLToPath(import.meta.url))}/files`;
    
//     const unZib = zlib.createUnzip()
//     const unZipFile = createReadStream(`${__dirname}/archive.gz`);
//     const targetFile = createWriteStream(`${__dirname}/fileToCompress.txt`);
    
//     unZipFile.pipe(unZib).pipe(targetFile)
// };

const decompress = async () => {
    const dirPath = join(import.meta.dirname, 'files');
    const readStr = createReadStream(join(dirPath, 'archive.gz'));
    const writeStr = createWriteStream(join(dirPath, 'fileToCompress1.txt'))
    const unzip = zlib.createGunzip();
    try {
        await pipeline(readStr, unzip, writeStr);
    } catch (error) {
        throw error;
    }
}

await decompress();