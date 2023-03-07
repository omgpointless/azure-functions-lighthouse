import path from "path";
import workerpool from 'workerpool';

const folder = path.join(process.cwd(), 'dist', 'lib', 'lighthouseRun.js');
export const pool = workerpool.pool(folder, {
    minWorkers:  process.env.MIN_WORKERS ? parseInt(process.env.MIN_WORKERS) : 1,
    maxWorkers: process.env.MAX_WORKERS ? parseInt(process.env.MAX_WORKERS) : 4
});

export default pool;