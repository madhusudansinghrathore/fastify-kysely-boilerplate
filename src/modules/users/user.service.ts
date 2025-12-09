import { CreateUserDto, UserDto } from '@/modules/users/user.schema';
import { IUserRepository } from '@/modules/users/user.repository';

export class UserService {
    constructor(private readonly userRepository: IUserRepository) { }

    async createUser(data: CreateUserDto): Promise<UserDto> {
        // Business logic example: Check if email already exists? 
        // Repository likely throws unique constraint error, or we can check here.
        // For TDD simplicity, we'll just delegate to repository.
        return this.userRepository.create(data);
    }

    async getUserById(id: string): Promise<UserDto> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error('User not found'); // Should be a custom HTTP exception ideally, handled by global error handler
        }
        return user;
    }
}
