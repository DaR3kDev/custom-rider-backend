import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from '~/user/user.service';
import { CreateUserInput } from '~/user/dto/create-user.input';
import { UpdateUserInput } from '~/user/dto/update-user.input';
import { User } from '~/user/entity/user.entity';
import { PaginationUserInput } from '~/user/dto/pagination-user.input';
import { PaginatedUserResponse } from '~/user/entity/paginated-user.response';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @HttpCode(HttpStatus.CREATED)
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Query(() => PaginatedUserResponse, { name: 'users' })
  paginateUsers(@Args('pagination') input: PaginationUserInput) {
    return this.userService.paginate(input);
  }

  @Query(() => User, { name: 'user' })
  findUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  @HttpCode(HttpStatus.OK)
  updateUser(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateUserInput) {
    return this.userService.update(id, input);
  }

  @Mutation(() => User)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.delete(id);
  }
}
