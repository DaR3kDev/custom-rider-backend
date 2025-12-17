import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientInput } from '~/client/dto/create-client.input';
import { UpdateClientInput } from '~/client/dto/update-client.input';
import { DatabaseService } from '~/database/database.service';
import { PaginationClientInput } from './dto/pagination-client.input';
import { PaginatedResponse } from '~/common/pagination/interfaces/pagination.interface';
import { Client, Prisma } from '~/generated/prisma/client';
import { PaginationHelper } from '~/common/pagination/pagination';

@Injectable()
export class ClientService {
  constructor(private readonly databaseServices: DatabaseService) {}

  async create(input: CreateClientInput) {
    const { documentNumber, email } = input;

    const existingClientByDocument = await this.databaseServices.client.findFirst({
      where: { documentNumber },
    });

    if (existingClientByDocument)
      throw new BadRequestException(
        'Ya existe un cliente registrado con este número de documento.',
      );

    const existingClientByEmail = await this.databaseServices.client.findFirst({
      where: { email },
    });

    if (existingClientByEmail)
      throw new BadRequestException('Ya existe un cliente registrado con este correo electrónico.');

    return this.databaseServices.client.create({
      data: input,
    });
  }

  async paginate(input: PaginationClientInput): Promise<PaginatedResponse<Partial<Client>>> {
    const { page, limit, search } = input;

    const filter: Prisma.ClientWhereInput = {
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { documentNumber: { contains: search } },
        ],
      }),
    };

    const clients = await this.databaseServices.client.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: filter,
    });

    const totalClients = await this.databaseServices.client.count({
      where: filter,
    });

    return PaginationHelper.build(clients, totalClients, page, limit);
  }

  async findOne(id: string) {
    return await this.databaseServices.client.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, input: UpdateClientInput) {
    const { documentNumber, email } = input;

    const existingClient = await this.databaseServices.client.findUnique({
      where: { id },
    });

    if (!existingClient) throw new BadRequestException('El cliente no existe.');

    if (documentNumber && documentNumber !== existingClient.documentNumber) {
      const existingClientByDocument = await this.databaseServices.client.findFirst({
        where: {
          documentNumber,
          NOT: { id },
        },
      });

      if (existingClientByDocument)
        throw new BadRequestException('Ya existe otro cliente con este número de documento.');
    }

    if (email && email !== existingClient.email) {
      const existingClientByEmail = await this.databaseServices.client.findFirst({
        where: {
          email,
          NOT: { id },
        },
      });

      if (existingClientByEmail)
        throw new BadRequestException('Ya existe otro cliente con este correo electrónico.');
    }

    return this.databaseServices.client.update({
      where: { id },
      data: input,
    });
  }

  async remove(id: string) {
    return await this.databaseServices.client.delete({ where: { id } });
  }
}
