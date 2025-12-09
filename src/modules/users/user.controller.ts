import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '@/modules/users/user.service';
import { CreateUserDto } from '@/modules/users/user.schema';

export class UserController {
    constructor(private readonly userService: UserService) { }

    async createUser(
        request: FastifyRequest<{ Body: CreateUserDto }>,
        reply: FastifyReply
    ) {
        const user = await this.userService.createUser(request.body);
        return reply.code(201).send(user);
    }

    async getUserById(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const user = await this.userService.getUserById(request.params.id);
            return reply.code(200).send(user);
        } catch (error: any) {
            if (error.message === 'User not found') {
                return reply.code(404).send({ message: 'User not found' });
            }
            throw error;
        }
    }
}
