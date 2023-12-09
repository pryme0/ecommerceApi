import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository, CartItemRepository } from '@varyOne/repositories';
import { UserModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';
import { JwtModule } from '@nestjs/jwt';
import { CartItem, Cart } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),

    forwardRef(() => UserModule),
    forwardRef(() => BooksModule),
    JwtModule.register({}),
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository, CartItemRepository],
  exports: [CartService, CartRepository, CartItemRepository],
})
export class CartModule {}
