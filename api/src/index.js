import express from 'express';

import { initializeServer, middlewareConfig, mongodbConnection } from './config';

const app = express();

middlewareConfig(app);

mongodbConnection.once('open', () => initializeServer(app));
