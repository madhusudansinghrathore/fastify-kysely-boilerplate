import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Validation Error',
            details: error.format(),
        });
    }

    request.log.error(error);

    const statusCode = error.statusCode || 500;
    return reply.status(statusCode).send({
        statusCode,
        error: error.name || 'Internal Server Error',
        message: statusCode === 500 ? 'Internal Server Error' : error.message,
    });
}
