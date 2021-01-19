const Redis = require('ioredis');
import { REDIS_HOST, REDIS_PORT } from './constants';

console.warn(`🌐 Connecting to Redis on redis://${REDIS_HOST}:${REDIS_PORT}`);
const client = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

client.on('error', error => {
  console.error(`❌ Redis connection error: ${error}`);
  client.quit();
});

client.on('connect', () => console.info('✅ Redis client connected'));

export default client;
