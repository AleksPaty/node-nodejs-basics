import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { pipeline } from 'stream/promises';

// const write = async () => {
//     const targetFile = `${dirname(fileURLToPath(import.meta.url))}/files/fileToWrite.txt`;
    
//     const writeAbleStream = fs.createWriteStream(targetFile, {flags: 'r+'})
//     process.stdin.pipe(writeAbleStream)
// };

const write = async () => {
    const filePath = path.join(import.meta.dirname, 'files', 'fileToWrite.txt');
    const writeStream = fs.createWriteStream(filePath);

    await pipeline(process.stdin, writeStream);
}

await write();