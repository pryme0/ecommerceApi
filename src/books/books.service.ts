import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto, FindByIdDto, FindBookDto } from './dto';
import { BookRepository } from '@varyOne/repositories';
import { UsersService } from 'src/users/users.service';
import { UpdateResultDto } from 'src/users/dto';
import { In } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(private readonly bokRepository: BookRepository) {}

  async create(input: CreateBookDto): Promise<BookDto> {
    console.log({ input });

    const checkBookExists = await this.bokRepository.findOne({
      where: { title: input.title },
    });

    if (checkBookExists) {
      throw new BadRequestException('Book already exists');
    }
    const bookObject = await this.bokRepository.create({ ...input });

    return await this.bokRepository.save(bookObject);
  }

  async findAll(filter: FindBookDto): Promise<BookDto[]> {
    return await this.bokRepository.find({ where: { ...filter } });
  }

  async findByIds(ids: string[]) {
    console.log(ids);
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
