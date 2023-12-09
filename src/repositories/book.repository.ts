import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class BookRepository extends BaseRepository<Book> {
  public entityName = 'books';

  constructor(dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }
}
