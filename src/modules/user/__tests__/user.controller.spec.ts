import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../user.schema';
import { UserDto } from '../user.dto';
import { UserModule } from '../user.module';
import { omit } from 'lodash';

// Describe la suite de pruebas para el controlador de usuario.
describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  const mockUser: UserDocument = { user: 'newuser', email: 'newuser@example.com', passwd: '1234' } as UserDocument;
  let mockUsers = [
    { username: 'user1', email: 'user1@example.com' },
    { username: 'user2', email: 'user2@example.com' },
  ];

  // Configura el controlador y sus dependencias antes de cada prueba.
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule]
    })
    .overrideProvider(getModelToken(User.name))
    .useValue(jest.fn)
    .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);

  });

  // Prueba básica para verificar si el controlador está definido.
  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  // Prueba para verificar el si el tipo de los usuarios listados es correcto
  describe('getUsers', () => {
   it('should return an Array of type User', async () => {
      jest.spyOn(userService, 'readUsers').mockImplementation(() => Promise.resolve(mockUsers as unknown as User[]));
      const result = await userController.getUsers();
      expect(result).toEqual(mockUsers);
   })
  })

  describe('createUser', () => {
    it('should create a new user', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValueOnce(mockUser);
      const result = await userController.createUser(mockUser as UserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUser', () => {
    it('should return a user by username', async () => {
      jest.spyOn(userService, 'readUserByUsername').mockResolvedValueOnce(mockUser);
      const result = await userController.getUser('newuser');
      const keysToDelete = ['passwd'];
      expect(result).toEqual(omit(mockUser, keysToDelete));
    });
  });
});