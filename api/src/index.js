import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import 'module-alias/register';

import graphqlSchema from '@/schemas';
import authenticated from '@/middleware/authenticated.js';

// Setup environment variables
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) require('dotenv').config({ path: '../.env.local' });
console.warn(`💚 Current environment set: ${process.env.NODE_ENV || 'development'}`);
const port = process.env.PORT;
// Setup express server
const app = express();
// Other app requirements
app.use(helmet({ contentSecurityPolicy: isProduction })); // Check in production
app.use(compression({}));
app.use(morgan('tiny', {}));
app.use(cors({}));
app.use(bodyParser.json());
// Setup middleware
app.use(authenticated);
// Setup GraphQL
app.use(
  '/graphql',
  graphqlHTTP(async (req) => ({
    schema: graphqlSchema,
    graphiql: true,
    context: {
      req,
    },
  })),
);
// Boot mongoose connection to MongoDB
console.warn(`🌐 Connecting to MongoDb on ${process.env.MONGODB_URL}`);
mongoose.connect(`mongodb://${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => app.listen(port, console.warn(`🚀 The server started on port ${port} 🔥`)));
