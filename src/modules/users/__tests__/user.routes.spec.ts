import Fastify, { FastifyInstance } from 'fastify';
import { usersRoutes } from '@/modules/users/user.routes';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

// Mock DB interactions for integration test to avoid needing running DB
// Alternatively, we could use a test DB. The prompt asks for "Integration test... to demonstrate TDD setup". 
// Usually integration tests hit the DB. 
// Given the constraints and to ensure it runs out of the box without complex DB setup in CI immediately, 
// I will mock the Repository in the routes or use dependency injection.
// However, `usersRoutes` instantiates classes directly. 
// For a true integration test in this setup, we usually start the whole app.
// I will attempt to mock the `db` instance imports if possible or just use unit-ish integration.
// Actually, let's make it a E2E-style test on the router, but mocking the repository layer would require DI container or module mocking.
// I'll stick to mocking the module `../user.repository` using Jest.

jest.mock('@/modules/users/user.repository', () => {
    return {
        UserRepository: jest.fn().mockImplementation(() => ({
            create: jest.fn().mockResolvedValue({
                id: '123e4567-e89b-12d3-a456-426614174000',
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            findById: jest.fn().mockResolvedValue({
                id: '123e4567-e89b-12d3-a456-426614174000',
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User',
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
        })),
    };
});

describe('User Routes', () => {
    let app: FastifyInstance;

    beforeAll(async () => {
        app = Fastify();
        app.setValidatorCompiler(validatorCompiler);
        app.setSerializerCompiler(serializerCompiler);
        await app.register(usersRoutes, { prefix: '/users' });
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /users should create a user', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/users',
            payload: {
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User',
            },
        });

        expect(response.statusCode).toBe(201);
        const body = JSON.parse(response.payload);
        expect(body).toHaveProperty('id');
        expect(body.email).toBe('test@example.com');
    });
});
