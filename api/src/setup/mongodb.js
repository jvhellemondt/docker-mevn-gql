import mongoose from 'mongoose';
import { IS_DEV, MONGO_DB, MONGO_HOST, MONGO_PASS, MONGO_PORT, MONGO_USER } from './constants';

const mongoConnectionString = `${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?compressors=zlib&gssapiServiceName=mongodb`;
console.warn(`🌐 Connecting to MongoDb on ${mongoConnectionString}`);

mongoose.set('debug', IS_DEV);
mongoose.connect(`mongodb://${mongoConnectionString}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (error) => console.error(`❌ Mongoose connection error: ${error}`));
mongoose.connection.once('open', () => console.info('✅ Mongoose client connected'));

export default mongoose;
