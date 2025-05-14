// const parseArgs = () => {
//     const argArr = process.argv.slice(2)
    
//     for (let i = 0; i < (argArr.length / 2); i++) {
//         console.log(`prop${i+1} ${argArr[i*2].replace('--', '')} is ${argArr[i*2+1]}`)
//     }
// };
// выше мой первый вариант

import { argv } from 'node:process';

const parseArgs = () => {
    for (let i = 2; i < argv.length; i += 2) {
        const argName = argv[i].slice(2);
        const argValue = argv[i+1];
        console.log(`${argName} ${argValue}`)
    }
}

parseArgs();