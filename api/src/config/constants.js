const IS_TEST = process.env.NODE_ENV === 'test';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_DEV = !IS_TEST && !IS_PRODUCTION;

const ROOT_DIR = process.env.PWD;
if (!IS_PRODUCTION) require('dotenv').config({ path: `${ROOT_DIR}/.env.local` });

// @TODO: organize in default-, development-, test- and productionConfigs
const {
  NODE_ENV = null,
  IS_NODE = null,
  EXPRESS_DOMAIN = null,
  EXPRESS_PORT = null,
  MONGO_HOST = null,
  MONGO_PORT = null,
  MONGO_DB = null,
  MONGO_USER = null,
  MONGO_PASS = null,
  JWT_SECRET = null,
  JWT_EXPIRATION = null,
} = process.env;

NODE_ENV ? console.warn(`💚 Current environment set: ${NODE_ENV}`) : console.error(`💔 No environment set`);

export {
  ROOT_DIR,
  NODE_ENV,
  IS_NODE,
  EXPRESS_DOMAIN,
  EXPRESS_PORT,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
  MONGO_USER,
  MONGO_PASS,
  JWT_SECRET,
  JWT_EXPIRATION,
  IS_TEST,
  IS_PRODUCTION,
  IS_DEV,
};
