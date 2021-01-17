import express from 'express';
import { initializeServer, middlewareConfig } from './config';

const app = express();
middlewareConfig(app);
initializeServer(app);
