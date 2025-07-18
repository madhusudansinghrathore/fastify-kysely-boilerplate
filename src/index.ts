import dotenv from "dotenv";
dotenv.config();

import Fastify from 'fastify';
import app from './app';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});
const serverPort: any = process.env.PORT;

fastify.register(app);

const start = async () => {
  try {
    await fastify.listen({ port: serverPort });
    console.log(`Server is running on http://localhost:${serverPort}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
