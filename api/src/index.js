import express from 'express';

import { databaseConnection, initializeServer, middlewareConfig } from './config';

const app = express();

middlewareConfig(app);

databaseConnection.once('open', () => initializeServer(app));
