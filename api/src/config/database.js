import mongoose from 'mongoose';
import { IS_DEV, MONGO_DB, MONGO_HOST, MONGO_PASS, MONGO_PORT, MONGO_USER } from './constants';

const mongoConnectionString = `${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?compressors=zlib&gssapiServiceName=mongodb`;

mongoose.set('debug', IS_DEV);

console.warn(`🌐 Connecting to MongoDb on ${mongoConnectionString}`);

mongoose.connect(`mongodb://${mongoConnectionString}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

export default db;
