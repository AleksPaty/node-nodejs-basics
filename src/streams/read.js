import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pipeline } from 'stream/promises';

// const read = async () => {
//     const targetFile = `${dirname(fileURLToPath(import.meta.url))}/files/fileToRead.txt`;

//     const readAbleStream = await fs.createReadStream(targetFile)
//     readAbleStream.pipe(process.stdout)
// };

const read = async () => {
    const _dirname = import.meta.dirname;
    const readStream = fs.createReadStream(join(_dirname, 'files', 'fileToRead.txt'), {encoding: 'utf8'});

    readStream.on('end', () => process.stdout.write('\n'));
    await pipeline(readStream, process.stdout);
}

await read();

// for correct visible text in cl need write '\n' on 'end' lisining stream