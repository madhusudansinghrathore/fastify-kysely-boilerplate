import { FastifyReply, FastifyRequest } from 'fastify';

export async function requestLogger(request: FastifyRequest, reply: FastifyReply) {
    request.log.info({ url: request.url, method: request.method }, 'Incoming Request');
}
