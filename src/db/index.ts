import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import { DB } from './types';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}

const url = new URL(connectionString);
const poolConfig = {
    host: url.hostname,
    port: parseInt(url.port || '3306', 10),
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

export const db = new Kysely<DB>({
    dialect: new MysqlDialect({
        pool: createPool(poolConfig),
    }),
});