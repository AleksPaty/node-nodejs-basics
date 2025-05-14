import { Transform } from 'stream';
import { pipeline } from 'stream/promises';


// const transform = async () => {
//     const transformStream = new Transform({
//         transform(chunk, encoding, callback) {
//             let res = chunk.toString()
//             let reverseData = res.split('').reverse().join('');
//             this.push(`${reverseData} \n`)
//             callback()
//         }
//     })

//     process.stdin.pipe(transformStream).pipe(process.stdout)
    
// };

const transform = async () => {
    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            const data = chunk.toString('utf8').replace(/[\r\n]+$/, '');
            const reversed = data.split('').reverse().join('');

            this.push(reversed + '\n\n');
            callback();
        },
    })
    try {
        await pipeline(process.stdin, transformStream, process.stdout);
    } catch (error) {
        throw error.message; 
    }
}

await transform();