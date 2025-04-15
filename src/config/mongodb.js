// t2t
// admin
//
//t2t
// xrfueh5FgKm9N2af
//
const MONGODB_URI =
  'mongodb+srv://t2t:admin@t2t-cluster0.4fgqb.mongodb.net/?retryWrites=true&w=majority&appName=t2t-cluster0';
const MONGODB_DB_NAME = 'trello-t2t';
import { MongoClient, ServerApiVersion } from 'mongodb';
let trelloDatabaseInstance = null;
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export const CONNECT_TO_MONGODB = async () => {
  await mongoClientInstance.connect();
  trelloDatabaseInstance = mongoClientInstance.db(MONGODB_DB_NAME);
};

export const GET_DB_INSTANCE = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Database instance not initialized');
  }
  return trelloDatabaseInstance;
};
