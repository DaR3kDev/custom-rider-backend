import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '~/user/user.service';
import { CreateUserInput } from '~/user/dto/create-user.input';
import { User } from '~/user/entity/user.entity';
import { PaginationUserInput } from '~/user/dto/pagination-user.input';
import { PaginatedUserResponse } from '~/user/entity/paginated-user.response';
import { UpdateUserInput } from '~/user/dto/update-user.input';
import { HttpCode, HttpStatus } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => PaginatedUserResponse, { name: 'users' })
  async paginate(@Args('pagination') paginationDto: PaginationUserInput) {
    return this.userService.paginate(paginationDto);
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.delete(id);
  }
}
