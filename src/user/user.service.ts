import argon2 from 'argon2';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from '~/user/dto/create-user.input';
import { DatabaseService } from '~/database/database.service';
import { Prisma, Status, User } from '~/generated/prisma/client';
import { PaginatedResponse } from '~/common/pagination/interfaces/pagination.interface';
import { PaginationUserInput } from './dto/pagination-user.input';
import { PaginationHelper } from '~/common/pagination/pagination';
import { IdGeneratorService } from '~/database/id-generator.service';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseServices: DatabaseService,
    private readonly idGenerator: IdGeneratorService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const existingUser = await this.databaseServices.user.findFirst({
      where: {
        OR: [{ documentNumber: createUserInput.documentNumber }, { email: createUserInput.email }],
      },
    });

    if (existingUser)
      throw new BadRequestException('El correo o número de documento ya está registrado.');

    return await this.databaseServices.user.create({
      data: {
        id: await this.idGenerator.getNextId('user'),
        ...createUserInput,
        status: createUserInput.status ?? Status.ACTIVE,
        password: await argon2.hash(createUserInput.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async paginate(paginationDto: PaginationUserInput): Promise<PaginatedResponse<Partial<User>>> {
    const { page, limit, search, role } = paginationDto;

    const where: Prisma.UserWhereInput = {
      ...(role && { role }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const users = await this.databaseServices.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
    });

    const totalUsers = await this.databaseServices.user.count({ where });

    const safeUsers = users.map(({ id, firstName, lastName, email, role }) => ({
      id,
      firstName,
      lastName,
      email,
      role,
    }));

    const paginatedResponse = PaginationHelper.build(safeUsers, totalUsers, page, limit);

    return paginatedResponse;
  }
}
