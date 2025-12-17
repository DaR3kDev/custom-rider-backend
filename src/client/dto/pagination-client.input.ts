import { InputType } from '@nestjs/graphql';
import { PaginationDto } from '~/common/pagination/dto/pagination.dto';

@InputType()
export class PaginationClientInput extends PaginationDto {}
