import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from './constants';

export default new Promise((resolve, reject) => {
  const redisConnectionString = `${REDIS_HOST}:${REDIS_PORT}`;
  console.warn(`🌐 Connecting to Redis on ${redisConnectionString}`);

  const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });
  redisClient.on('error', (error) => reject(`Redis connection error: ${error}`));
  redisClient.once('open', () => {
    console.info('Redis connected');
    return resolve();
  });
});
