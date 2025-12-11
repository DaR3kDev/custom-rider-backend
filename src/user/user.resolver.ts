import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '~/user/user.service';
import { CreateUserInput } from '~/user/dto/create-user.input';
import { User } from '~/user/entity/user.entity';
import { PaginationUserInput } from './dto/pagination-user.input';
import { PaginatedUserResponse } from './entity/paginated-user.response';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  } 

  @Query(() => PaginatedUserResponse, { name: 'users' })
  async paginate(@Args('pagination') paginationDto: PaginationUserInput) {
    return this.userService.paginate(paginationDto);
  }
}
