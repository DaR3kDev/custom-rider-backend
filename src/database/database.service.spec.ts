import { Test } from '@nestjs/testing';
import { DatabaseService } from '~/database/database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: DatabaseService,
          useValue: {
            $connect: jest.fn(),
            $disconnect: jest.fn(),
            onModuleInit() {
              return this.$connect();
            },
            onModuleDestroy() {
              return this.$disconnect();
            },
          },
        },
      ],
    }).compile();

    service = moduleRef.get(DatabaseService);
  });

  it('should connect on init', async () => {
    await service.onModuleInit();
    expect(service.$connect).toHaveBeenCalled();
  });

  it('should disconnect on destroy', async () => {
    await service.onModuleDestroy();
    expect(service.$disconnect).toHaveBeenCalled();
  });
});
