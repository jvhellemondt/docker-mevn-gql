import * as constant from './constants';
import './aliases';
import middlewareConfig from './middleware';
import mongodbConnection from './mongodb.js';
import redisConnection from './redis.js';
import initializeExpress from './express';

const initializeServer = async (app) => {
  try {
    await mongodbConnection;
    await redisConnection;
    await initializeExpress(app);
  } catch (error) {
    console.error('caught', error);
  }
};

export default constant;
export { middlewareConfig, initializeServer };
