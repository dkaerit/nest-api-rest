import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user.module';
import { MongoModule } from '../../../database/mongo.module';

// Describe la suite de pruebas para el módulo de usuario.
describe('UserModule', () => {
  let module: TestingModule;

  // Configura el módulo de prueba antes de todas las pruebas.
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UserModule, MongoModule],
    }).compile();
  });

  // Prueba básica para verificar si el módulo está definido.
  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});