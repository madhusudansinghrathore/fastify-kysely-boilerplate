import { db } from '@/db/kysely';
import { CreateUserDto, UserDto } from '@/modules/users/user.schema';

export interface IUserRepository {
    create(data: CreateUserDto): Promise<UserDto>;
    findById(id: string): Promise<UserDto | null>;
}

export class UserRepository implements IUserRepository {
    async create(data: CreateUserDto): Promise<UserDto> {
        const result = await db
            .insertInto('users')
            .values({
                id: crypto.randomUUID(), // Kysely doesn't auto-generate UUIDs unless configured in DB, but we can do it here or let DB handle it if set up with gen_random_uuid(). Prisma schema has @default(uuid()) but Kysely inserts raw. Doing strict insert here for safety or relying on returning.
                // Actually, better to let DB handle defaults if possible, but Kysely specific insert might need all fields if not careful with DEFAULT.
                // Prisma's @default(uuid()) relies on Prisma middleware or DB default. Postgres needs `pgcrypto` or `uuid-ossp` for uuid_generate_v4().
                // Let's assume the DB has default or we generate it. Node v24 has crypto.
                ...data,
                updatedAt: new Date(),
                // createdAt is default now()
            })
            .returningAll()
            .executeTakeFirstOrThrow();

        return result;
    }

    async findById(id: string): Promise<UserDto | null> {
        const result = await db
            .selectFrom('users')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();

        return result || null;
    }
}
