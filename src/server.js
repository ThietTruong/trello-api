import express from 'express';
import { CONNECT_TO_MONGODB, GET_DB_INSTANCE } from './config/mongodb.js';

const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 5555;

const START_SERVER = async () => {
  app.get('/', async (req, res) => {
    res.send('Hello World!');
    const collections = await GET_DB_INSTANCE().listCollections().toArray();
    console.log(collections);
  });
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
  });
};
(async () => {
  try {
    console.log('Connecting to MongoDB');
    await CONNECT_TO_MONGODB();
    console.log('Connected to MongoDB');
    START_SERVER();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(0);
  }
})();

export default app;
