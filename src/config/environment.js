// File content was just a comment block that has been removed
import "dotenv/config";
export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE || "dev",
  AUTHOR: process.env.AUTHOR || "thiet311",
};
