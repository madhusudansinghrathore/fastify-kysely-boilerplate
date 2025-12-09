import { UserService } from '@/modules/users/user.service';
import { IUserRepository } from '@/modules/users/user.repository';
import { CreateUserDto, UserDto } from '@/modules/users/user.schema';

const mockRepo: IUserRepository = {
    create: jest.fn(),
    findById: jest.fn(),
};

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        service = new UserService(mockRepo);
        jest.clearAllMocks();
    });

    it('should create a user', async () => {
        const input: CreateUserDto = {
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
        };
        const expectedC: UserDto = {
            id: 'uuid',
            createdAt: new Date(),
            updatedAt: new Date(),
            ...input,
        };

        (mockRepo.create as jest.Mock).mockResolvedValue(expectedC);

        const result = await service.createUser(input);

        expect(mockRepo.create).toHaveBeenCalledWith(input);
        expect(result).toEqual(expectedC);
    });

    it('should throw error if user not found', async () => {
        (mockRepo.findById as jest.Mock).mockResolvedValue(null);

        await expect(service.getUserById('uuid')).rejects.toThrow('User not found');
    });
});
