import crypto, { createHash } from 'node:crypto';
//import * as fs from 'fs/promises';
//import { dirname } from 'node:path';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

// const calculateHash = async () => {
//     const targetFile = `${dirname(import.meta.url).slice(8)}/files/fileToCalculateHashFor.txt`;
//     const content = await fs.readFile(targetFile, 'utf8')
    
//     const hash = crypto.createHash('sha256').update(content)
    
//     console.log(hash.digest('hex'))
// };

const calculateHash = async () => {
    const hash = createHash('sha256');
    const readStr = createReadStream(`${import.meta.dirname}/files/fileToCalculateHashFor.txt`);
    hash.setEncoding('hex');

    await pipeline(readStr, hash);

    const data = hash.read();
    console.log(data);    
}

await calculateHash();