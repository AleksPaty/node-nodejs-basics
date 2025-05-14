import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { Worker, isMainThread} from 'worker_threads';
import { cpus } from 'os';
import { rejects } from 'assert';

// const performCalculations = async () => {
//     const workerFile = `${dirname(fileURLToPath(import.meta.url))}/worker.js`;
//     const CpuCores = cpus().length;
//     const workers = [];
//     let increment = 10;
//     let result = [];

//     const getResult = (worker) => new Promise((resolve) => {
//         worker.on('message', (data) => {
//             resolve ({ status: 'resolved', data })
//         })
//         worker.on('error', () => {
//             resolve ({status: 'error', data: null})
//         })
//     })

//     for(let c = 0; c < CpuCores; c++){
//         workers.push(new Worker(workerFile))
//         workers[c].postMessage(increment)
//         increment += 1;

//         result.push(await getResult(workers[c]))
        
//     }
//     console.log(result)
       
// };

const performCalculations = async () => {
    const workerPath = join(import.meta.dirname, 'worker.js');
    const hostCpus = cpus();
    let incrNumb = 10; 
    const promiseResult = await Promise.allSettled(
        hostCpus.map(() => {
            return new Promise((resolve, rejects) => {
                const worker = new Worker(workerPath, {workerData: incrNumb += 1});

                worker.on('message', resolve);
                worker.on('error', rejects);
            })
        })
    )
    const result = promiseResult.map((arr) => {
        return {
            status: arr.status === 'fulfilled' ? 'resolved' : 'error',
            data: arr.value || null
        }
    })
    console.log(result);
}

await performCalculations();