import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { UserRepository } from '@/modules/users/user.repository';
import { UserService } from '@/modules/users/user.service';
import { UserController } from '@/modules/users/user.controller';
import { createUserSchema, userResponseSchema, getUserParamsSchema } from '@/modules/users/user.schema';
import { requestLogger } from '@/common/middleware/request-logger';

export async function usersRoutes(app: FastifyInstance) {
    const repository = new UserRepository();
    const service = new UserService(repository);
    const controller = new UserController(service);

    app.addHook('onRequest', requestLogger);

    app.withTypeProvider<ZodTypeProvider>().post(
        '/',
        {
            schema: {
                body: createUserSchema,
                response: {
                    201: userResponseSchema,
                },
            },
        },
        controller.createUser.bind(controller)
    );

    app.withTypeProvider<ZodTypeProvider>().get(
        '/:id',
        {
            schema: {
                params: getUserParamsSchema,
                response: {
                    200: userResponseSchema,
                },
            },
        },
        controller.getUserById.bind(controller)
    );
}
