import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  BookDto,
  FindByIdDto,
  FindBookDto,
  FindBookAndCountResponse,
} from './dto';
import { BookRepository } from '@varyOne/repositories';
import { UsersService } from 'src/users/users.service';
import { UpdateResultDto } from 'src/users/dto';
import { In } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(private readonly bokRepository: BookRepository) {}

  async create(input: CreateBookDto): Promise<BookDto> {
    const checkBookExists = await this.bokRepository.findOne({
      where: { title: input.title },
    });

    if (checkBookExists) {
      throw new BadRequestException('Book already exists');
    }
    const bookObject = await this.bokRepository.create({ ...input });

    return await this.bokRepository.save(bookObject);
  }

  async findAll(filter: FindBookDto): Promise<FindBookAndCountResponse> {
    const skip = (filter.page - 1) * filter.pageSize;
    const take = filter.pageSize;

    delete filter.page;
    delete filter.pageSize;

    const resp = await this.bokRepository.findAndCount({
      where: { ...filter },
      skip: skip || 0,
      take: take || 5,
    });

    return { books: resp[0], count: resp[1] };
  }

  async findByIds(ids: string[]) {
    return await this.bokRepository.findBy({
      id: In(ids),
    });
  }

  async findOne(filter: FindByIdDto): Promise<BookDto> {
    return await this.bokRepository.findOne({ where: { ...filter } });
  }

  async update(input: UpdateBookDto): Promise<UpdateResultDto> {
    return (await this.bokRepository.update(input.id, {
      ...input.data,
    })) as any as UpdateResultDto;
  }
}
