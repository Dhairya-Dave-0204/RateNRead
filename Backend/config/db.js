/*
This is the file for database connection for postgres.
It uses the pool method used for production grade apps.
Pool method does not require explicit connection function for query execution, just import it and use it.
*/
import pkg from "pg"

const { Pool } = pkg

const dbPool = new Pool({
    user: process.env.POSTGRE_USER,
    host: process.env.POSTGRE_HOST,
    database: process.env.POSTGRE_DB,
    password: process.env.POSTGRE_PASSWORD,
    port: process.env.POSTGRE_PORT,
})

export default dbPool