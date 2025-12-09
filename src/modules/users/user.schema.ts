import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

export const userResponseSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const getUserParamsSchema = z.object({
    id: z.string().uuid(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UserDto = z.infer<typeof userResponseSchema>;
