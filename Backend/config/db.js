/*
This is the file for database connection for postgres.
It uses the pool method used for production grade apps.
Pool method does not require explicit connection function for query execution, just import it and use it.

The path and url setup is done for the working of the script to import the books in database.
It uses dotenv to load environment variables from .env file.
*/
import pkg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { Pool } = pkg;

const dbPool = new Pool({
  user: process.env.POSTGRE_USER,
  host: process.env.POSTGRE_HOST,
  database: process.env.POSTGRE_DB,
  password: process.env.POSTGRE_PASSWORD,
  port: process.env.POSTGRE_PORT,
});

export default dbPool;
