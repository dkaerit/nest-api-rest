import { Test, TestingModule } from '@nestjs/testing';
import { RootController } from './root.controller';
import { RootService } from './root.service';

describe('rootController', () => {
  let rootController: RootController;

  beforeEach(async () => {
    const root: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
      providers: [RootService],
    }).compile();

    rootController = root.get<RootController>(RootController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rootController.getUsers()).toBe('Hello World!');
    });
  });
});
