import * as constant from './constants';
import './aliases';
import middlewareConfig from './middleware';
import mongodbConnection from './mongodb.js';
import initializeExpress from './express';

const initializeServer = (app) => {
  try {
    mongodbConnection();
    initializeExpress(app);
  } catch (error) {
    console.error(error);
  }
};

export default constant;
export { middlewareConfig, initializeServer };
