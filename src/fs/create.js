import * as fs from 'fs/promises';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

// const create = async () => {
//     const filePath = `${dirname(fileURLToPath(import.meta.url))}/files/fresh.txt`;
    
//     fs.access(filePath, fs.constants.R_OK)
//         .then(() => {
//             let error = new Error('FS operation failed')
//             console.log(error)
//         })
//         .catch((error) => {
//             error = null;
//             fs.writeFile(filePath, 'I am fresh and young')
//         })   
    
// };

const create = async () => {
    const filePath = `${import.meta.dirname}/files/fresh.txt`;
    const phrase = 'I am fresh and young';
    try {
        await fs.writeFile(filePath, phrase, {flag: 'wx'});
    } catch (err) {
        if (err.message.includes('EEXIST')) throw Error('FS operation failed');
        throw err;
    }
}

await create();