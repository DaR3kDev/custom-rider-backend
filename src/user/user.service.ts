import argon2 from 'argon2';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from '~/user/dto/create-user.input';
import { DatabaseService } from '~/database/database.service';
import { Prisma, Status, User } from '~/generated/prisma/client';
import { PaginatedResponse } from '~/common/pagination/interfaces/pagination.interface';
import { PaginationHelper } from '~/common/pagination/pagination';
import { UpdateUserInput } from '~/user/dto/update-user.input';
import { PaginationUserInput } from '~/user/dto/pagination-user.input';

@Injectable()
export class UserService {
  constructor(private readonly databaseServices: DatabaseService) {}

  async create(createUserInput: CreateUserInput) {
    const { documentNumber, email, password, status } = createUserInput;

    const existingUser = await this.databaseServices.user.findFirst({
      where: {
        OR: [{ documentNumber }, { email }],
      },
    });

    if (existingUser)
      throw new BadRequestException('El correo o número de documento ya está registrado.');

    return await this.databaseServices.user.create({
      data: {
        ...createUserInput,
        status: status ?? Status.ACTIVE,
        password: await argon2.hash(password),
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

    const safeUsers = users.map(({ id, firstName, lastName, email, role, status }) => ({
      id,
      firstName,
      lastName,
      email,
      role,
      status,
    }));

    return PaginationHelper.build(safeUsers, totalUsers, page, limit);
  }

  async findOne(id: number) {
    return await this.databaseServices.user.findUnique({
      where: { id },
      include: {
        documentType: true,
        municipality: {
          include: {
            department: true,
          },
        },
      },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.databaseServices.user.findUnique({
      where: { id },
    });

    if (!user) throw new BadRequestException('El usuario no existe.');

    const { password, confirmPassword } = updateUserInput;

    if (!confirmPassword)
      throw new BadRequestException('Debe enviar la contraseña si desea confirmar la contraseña.');

    if (password !== confirmPassword)
      throw new BadRequestException('Las contraseñas no coinciden.');

    if (await argon2.verify(user.password, password))
      throw new BadRequestException('Debe ingresar una contraseña diferente a la actual.');

    updateUserInput.password = await argon2.hash(password);
    delete updateUserInput.confirmPassword;

    await this.databaseServices.user.update({
      where: { id },
      data: updateUserInput,
    });

    return this.databaseServices.user.findUnique({
      where: { id },
      include: {
        documentType: true,
        municipality: {
          include: { department: true },
        },
      },
    });
  }

  async delete(id: number) {
    return await this.databaseServices.user.delete({ where: { id } });
  }
}
