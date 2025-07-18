import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { db } from '../db';

// Augment FastifyInstance to include Kysely instance
declare module 'fastify' {
    interface FastifyInstance {
        kysely: typeof db;
    }
}

const kyselyPlugin: FastifyPluginAsync = fp(async (fastify: FastifyInstance) => {
    fastify.decorate('kysely', db);

    fastify.addHook('onClose', async (instance) => {
        await instance.kysely.destroy(); // Destroy Kysely pool on close
    });
});

export default kyselyPlugin;