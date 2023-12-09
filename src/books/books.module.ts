import { Module, forwardRef } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { UserModule } from 'src/users/users.module';
import { BookRepository } from '@varyOne/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
  exports: [BookRepository, BooksService],
})
export class BooksModule {}
