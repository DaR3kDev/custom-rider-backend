import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '~/database/database.service';
import { PrismaClient } from '~/generated/prisma/client';

@Injectable()
export class IdGeneratorService {
  constructor(private readonly dataService: DatabaseService) {}

  /**
   * Calcula el próximo ID consecutivo disponible para cualquier modelo Prisma con id: Int
   * @param modelName Nombre del modelo dentro del PrismaClient
   */
  async getNextId<T extends keyof PrismaClient>(modelName: T): Promise<number> {
    const model = this.dataService[modelName] as unknown as {
      findMany: (args: {
        select: { id: true };
        orderBy: { id: 'asc' };
      }) => Promise<{ id: number }[]>;
    };

    if (!model || typeof model.findMany !== 'function')
      throw new BadRequestException(`Modelo '${String(modelName)}' no existe en Prisma.`);

    const records = await model.findMany({
      select: { id: true },
      orderBy: { id: 'asc' },
    });

    let nextId = 1;
    while (nextId <= records.length) {
      if (records[nextId - 1].id !== nextId) return nextId;
      nextId++;
    }

    return nextId;
  }
}
