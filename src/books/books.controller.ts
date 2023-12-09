import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FindByIdDto, FindBookDto, BookDto } from './dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UpdateResultDto } from 'src/users/dto';
import { JwtGuard } from 'src/helpers';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: BookDto,
    description: 'Creates a book',
  })
  @HttpCode(200)
  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createBookDto: CreateBookDto): Promise<BookDto> {
    return await this.booksService.create(createBookDto);
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: [BookDto],
    description: 'Gets books',
  })
  @HttpCode(200)
  @Get()
  @UseGuards(JwtGuard)
  async findAll(@Query() filter: FindBookDto): Promise<BookDto[]> {
    console.log({ filter });
    return await this.booksService.findAll(filter);
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: BookDto,
    description: 'Gets single book',
  })
  @HttpCode(200)
  @Get(':bookId')
  @UseGuards(JwtGuard)
  async findOne(@Param('bookId') id: string): Promise<BookDto> {
    console.log(id);
    return await this.booksService.findOne({ id });
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: UpdateResultDto,
    description: 'Updated single bok',
  })
  @HttpCode(200)
  @Patch(':bookId')
  @UseGuards(JwtGuard)
  async update(
    @Param('bookId') id: string,
    @Body() body: UpdateBookDto,
  ): Promise<UpdateResultDto> {
    return await this.booksService.update({ ...body, id });
  }
}
