import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from '../user.service';
import { User } from '../user.schema';

// Describe la suite de pruebas para el servicio de usuario.
describe('UserService', () => {
  let service: UserService;

  // Configura el servicio y sus dependencias antes de cada prueba.
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          // Simula el modelo de mongoose para User durante las pruebas.
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(), // función simulada que imita "find" de mongoose
            findOne: jest.fn(), // función simulada que imita "findOne" de mongoose
            save: jest.fn(), // función simulada que imita "save" de mongoose
          },
        },
      ],
    }).compile(); // Compila el módulo de prueba y devuelve la instancia de TestingModule. 

    service = module.get<UserService>(UserService);
  });

  // Prueba básica para verificar si el servicio está definido.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Aquí puedes agregar más pruebas para los métodos específicos del servicio.
});

