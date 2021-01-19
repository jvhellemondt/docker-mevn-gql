import express from 'express';
import { initializeServer, middlewareConfig } from './setup';

const app = express();
middlewareConfig(app);
initializeServer(app);
