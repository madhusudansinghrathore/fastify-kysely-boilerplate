import Fastify, { FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { config } from '@/config';
import { usersRoutes } from '@/modules/users/user.routes';
import { errorHandler } from '@/common/errors/handler';

export async function buildApp(): Promise<FastifyInstance> {
    const app = Fastify({
        logger: {
            level: config.logLevel,
            transport:
                config.env === 'development'
                    ? {
                        target: 'pino-pretty',
                        options: {
                            translateTime: 'HH:MM:ss Z',
                            ignore: 'pid,hostname',
                        },
                    }
                    : undefined,
        },
    });

    // Zod validation
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    // Global Error Handler
    app.setErrorHandler(errorHandler);

    // Health Check
    app.get('/health', async () => {
        return { status: 'ok' };
    });

    // API Routes
    await app.register(usersRoutes, { prefix: '/users' });

    return app;
}
