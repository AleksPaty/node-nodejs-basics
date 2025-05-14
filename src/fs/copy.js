import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

// const copy = async () => {
//     const workPath = path.dirname(fileURLToPath(import.meta.url))

//     try {
//         const files = await fs.readdir(`${workPath}/files`)

//         fs.mkdir(`${workPath}/files_copy`)
//             .then(async() => {
//                 const callback = (err) => {
//                     if(err) throw err
//                 }
//                 for (const file of files) {
//                     fs.copyFile(`${workPath}/files/${file}`, `${workPath}/files_copy/${file}`, fs.constants.COPYFILE_EXCL, callback)
//                 }
//             })
//             .catch((err) => {
//                 err = new Error('FS operation failed')
//                 console.log(err)
//             })    
              
//     } catch (err) {
//         err = new Error('FS operation failed')
//         console.log(err)
//     }
// };

const copy = async () => {
    const parentFolder = import.meta.dirname;
    try {
        await fs.mkdir(`${parentFolder}/files_copy`);
        await fs.cp(`${parentFolder}/files`, `${parentFolder}/files_copy`, {recursive: true});
    } catch (err) {
        if(err.code === 'EEXIST') throw Error('FS operation failed');
        throw err;
    }
}

await copy();
