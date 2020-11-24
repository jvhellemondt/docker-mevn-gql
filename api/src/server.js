import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';

import graphqlSchema from './schemas';
import authenticated from './middleware/authenticated.js';

// Setup express server
const app = express();

// Setup environment variables
const isProduction = process.env.NODE_ENV === 'production';

console.warn(`💚 Current environment set: ${process.env.NODE_ENV || 'development'}`);

if (!isProduction) {
  const dotenv = require('dotenv');
  dotenv.config({ path: '../.env.local' });
}
const port = process.env.PORT;

// Other app requirements
app.use(helmet({ contentSecurityPolicy: isProduction })); // Check in production
app.use(compression());
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

// Setup middleware
app.use(authenticated)

// Setup GraphQL
const gqlPath = '/graphql';

app.use(
  gqlPath,
  graphqlHTTP(async (req) => ({
    schema: graphqlSchema,
    // rootValue: graphqlResolvers,
    graphiql: true,
    context: {
      req,
    }
  })),
);

// MongoDB settings
console.warn(`🌐 Connecting to MongoDb on ${process.env.MONGODB_URL}`);
const uri = `mongodb://${process.env.MONGODB_URL}`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Boot server with mongoose
mongoose.connect(uri, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => app.listen(port, console.warn(`🚀 The server started on port ${port} 🔥`)));
