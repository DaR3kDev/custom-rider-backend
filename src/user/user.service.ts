import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DatabaseService } from '~/database/database.service';
import { IdGeneratorService } from '~/database/id-generator.service';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseServices: DatabaseService,
    private readonly idGenerator: IdGeneratorService,
  ) {}

  async create(createUserInput: CreateUserInput) {}

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    1;
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
