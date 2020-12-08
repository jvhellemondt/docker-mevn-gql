import * as constant from './constants';
import './aliases';
import middlewareConfig from './middleware';
import databaseConnection from './database';
import initializeServer from './express';

export default constant;
export { initializeServer, databaseConnection, middlewareConfig };
