import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '~/database/database.service';
import { IdGeneratorService } from '~/database/id-generator.service';
import { Department, Municipality, Status } from '~/generated/prisma/client';
import Colombia from '~/location/data/colombia.json';

@Injectable()
export class LocationService implements OnModuleInit {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly idGenerator: IdGeneratorService,
  ) {}

  async onModuleInit() {
    for (const { department: name, municipalities } of Colombia) {
      const department = await this.databaseService.department.upsert({
        where: { name },
        update: {},
        create: { id: await this.idGenerator.getNextId('department'), name },
      });

      for (const name of municipalities) {
        const existing = await this.databaseService.municipality.findUnique({
          where: { name_departmentId: { name, departmentId: department.id } },
        });

        if (!existing) {
          await this.databaseService.municipality.create({
            data: {
              id: await this.idGenerator.getNextId('municipality'),
              name,
              status: Status.ACTIVE,
              departmentId: department.id,
            },
          });
        }
      }
    }
  }

  async getDepartments(): Promise<Department[]> {
    return this.databaseService.department.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getMunicipalitiesByDepartment(departmentId: number): Promise<Municipality[]> {
    return this.databaseService.municipality.findMany({
      where: { departmentId },
      orderBy: { name: 'asc' },
      include: { department: true },
    });
  }
}
