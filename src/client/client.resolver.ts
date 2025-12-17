import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { ClientService } from '~/client/client.service';
import { Client } from '~/client/entities/client.entity';
import { CreateClientInput } from '~/client/dto/create-client.input';
import { UpdateClientInput } from '~/client/dto/update-client.input';
import { PaginatedClientResponse } from '~/client/entities/paginated-user.response';
import { PaginationClientInput } from '~/client/dto/pagination-client.input';

@Resolver(() => Client)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Mutation(() => Client)
  @HttpCode(HttpStatus.CREATED)
  createClient(@Args('input') input: CreateClientInput) {
    return this.clientService.create(input);
  }

  @Query(() => PaginatedClientResponse, { name: 'clients' })
  paginateClients(@Args('pagination') input: PaginationClientInput) {
    return this.clientService.paginate(input);
  }

  @Query(() => Client, { name: 'client' })
  findClientById(@Args('id', { type: () => String }) id: string) {
    return this.clientService.findOne(id);
  }

  @Mutation(() => Client)
  @HttpCode(HttpStatus.OK)
  updateClient(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateClientInput,
  ) {
    return this.clientService.update(id, input);
  }

  @Mutation(() => Client)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteClient(@Args('id', { type: () => String }) id: string) {
    return this.clientService.remove(id);
  }
}
