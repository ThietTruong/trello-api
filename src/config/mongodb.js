import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from './environment.js';

let trelloDatabaseInstance = null;
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_TO_MONGODB = async () => {
  await mongoClientInstance.connect();
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const GET_DB_INSTANCE = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Database instance not initialized');
  }
  return trelloDatabaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
 


