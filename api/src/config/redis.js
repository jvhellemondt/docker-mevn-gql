import redis from 'redis';
import { REDIS_HOST, REDIS_PORT } from './constants';

export default new Promise((resolve, reject) => {
  const redisConnectionString = `redis://${REDIS_HOST}:${REDIS_PORT}`;
  console.warn(`🌐 Connecting to Redis on ${redisConnectionString}`);

  const redisClient = redis.createClient({ url: redisConnectionString });
  redisClient.on('error', (error) => reject(`Redis connection error: ${error}`));
  redisClient.once('open', () => {
    console.info('Redis connected');
    return resolve();
  });
});
