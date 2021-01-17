import Redis from 'ioredis';

console.warn(`🌐 Connecting to MongoDb on ${mongoConnectionString}`);

const client = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on('connect', () => console.info('✨ Redis client connected'));
client.on('error', console.error.bind(console, 'connection error:'));

export default client;
