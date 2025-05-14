import {spawn, fork} from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// const spawnChildProcess = async (args) => {
//     const __filename = `${dirname(fileURLToPath(import.meta.url))}/files/script.js`;
//     const child = fork(__filename, [...args], {silent: true})
//     child.on('message', (data) => process.stdout.write(data))
    
//     process.stdin.pipe(child.stdin)
//     child.stdout.pipe(process.stdout)
// };

const spawnChildProcess = async (args) => {
    const filePath = join(import.meta.dirname, 'files', 'script.js');
    const proc = fork(filePath, args.split(' '), {
        stdio: ['pipe', 'pipe', 'inherit', 'ipc']
    });

    process.stdin.on('data', (data) => {
        proc.stdin.write(data);
    });
    proc.stdout.on('data', (data) => {
        process.stdout.write(data);
    })
}

// Put your arguments in function call to test this functionality
spawnChildProcess( '--silent --all' );
