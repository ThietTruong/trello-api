import express from 'express';
import exitHook from 'async-exit-hook';
import { CONNECT_TO_MONGODB, GET_DB_INSTANCE, CLOSE_DB } from './config/mongodb.js'; // Reverted to ~
import { env } from './config/environment.js'; 
import {APIs_V1} from './routes/v1/index.js';

const app = express();
const hostname = env.APP_HOST || '127.0.0.1'; // Use env variable or default
const port = env.PORT || 5555;

console.log("ENV HOST:", env.APP_HOST)

const START_SERVER = async () => {
  // Middleware to parse JSON bodies
  app.use(express.json());

  app.get('/', async (req, res) => {
    try {
      // Check if DB instance exists before querying
      const db = GET_DB_INSTANCE();
      if (db) {
        const collections = await db.listCollections().toArray();
        console.log(collections);
        res.send('Hello World! Collections listed in console.');
      } else {
        res.status(500).send('Database not connected.');
      }
    } catch (error) {
      console.error('Error listing collections:', error);
      res.status(500).send('Error accessing database.');
    }
  });
  // enable json body parsing
  app.use(express.json())
  // Mount API routes
  app.use("/v1", APIs_V1);

  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
  });

  // Graceful shutdown
  exitHook(async (callback) => {
    console.log(`Server stopping...`);
    if (CLOSE_DB) {
      await CLOSE_DB(); // Ensure closeDB is awaited if it's async
    }
    console.log(`Server stopped`);
    callback();
  });
};

(async () => {
  try {
    console.log('Connecting to MongoDB...');
    await CONNECT_TO_MONGODB();
    console.log('Connected to MongoDB');
    START_SERVER();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Use exit code 1 for errors
  }
})();

export default app;
