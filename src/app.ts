import { FastifyPluginAsync } from 'fastify';
import prismaPlugin from './plugins/prisma';
import kyselyPlugin from './plugins/kysely';

const app: FastifyPluginAsync = async (fastify, opts) => {
    await fastify.register(prismaPlugin);
    await fastify.register(kyselyPlugin);

    fastify.get('/', async (request, reply) => {
        return { status: 'ok', timestamp: new Date().toISOString() };
    });

    // fastify.register(messageRoutes, { prefix: '/api' });
};

export default app;
