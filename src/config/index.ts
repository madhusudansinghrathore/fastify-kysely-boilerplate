import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform(Number).default('3000'),
    LOG_LEVEL: z.string().default('info'),
    DATABASE_URL: z.string(),
    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.string().transform(Number).default('6379'),
});

const env = envSchema.parse(process.env);

export const config = {
    env: env.NODE_ENV,
    port: env.PORT,
    logLevel: env.LOG_LEVEL,
    db: {
        url: env.DATABASE_URL,
    },
    redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
    },
};
