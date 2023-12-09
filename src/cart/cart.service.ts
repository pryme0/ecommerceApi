import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import {
  RemoveBookFromCartDto,
  ResetCartDto,
  ResponseMessageSto,
  UpdateCartDto,
} from './dto/update-cart-item.dto';
import { CartRepository, CartItemRepository } from '@varyOne/repositories';
import { CartDto, FindCardByIdDto, FindCartDto } from './dto';
import { BooksService } from 'src/books/books.service';
import { UpdateResultDto, UserDto } from 'src/users/dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly bookService: BooksService,
    private readonly cartItemRepository: CartItemRepository,
  ) {}

  async create(input: CreateCartDto, user: UserDto): Promise<CartDto> {
    const userHasCart = await this.cartRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (userHasCart) {
      throw new BadRequestException('A cart already exists for this user');
    }

    const cartObject = await this.cartRepository.create({ ...input, user });

    const newCart = await this.cartRepository.save(cartObject);

    return newCart;
  }

  async findAll(filter: FindCartDto): Promise<CartDto[]> {
    const carts = await this.cartRepository.find({
      where: { ...filter },
      relations: ['books'],
    });

    return carts;
  }

  async findOne(filter: FindCardByIdDto): Promise<CartDto> {
    const cart = await this.cartRepository.findOne({
      where: { ...filter },
      relations: ['books'],
    });

    console.log({ cart });

    return cart;
  }

  async addBookToCart(input: UpdateCartDto): Promise<CartDto> {
    // Find the cart
    const cart = await this.cartRepository.findOne({
      where: { id: input.id },
      relations: ['books'],
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Find the book
    const book = await this.bookService.findOne({ id: input.data.bookId });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (book.quantity < input.data.quantity) {
      throw new BadRequestException(
        `Out of Stock only ${book.quantity} units available`,
      );
    }

    const existingCartItem = await this.cartItemRepository.findOne({
      where: { book: { id: input.data.bookId } },
      relations: ['book'],
    });

    if (existingCartItem) {
      // If the book is already in the cart, update the quantity
      const updatedQuantity = existingCartItem.quantity + input.data.quantity;

      await this.cartItemRepository.update(existingCartItem.id, {
        quantity: updatedQuantity,
      });
    } else {
      // If the book is not in the cart, create a new cart item
      const cartItemObj = this.cartItemRepository.create({
        cart,
        book,
        quantity: input.data.quantity,
      });

      await this.cartItemRepository.save(cartItemObj);

      await this.cartRepository
        .createQueryBuilder('cart')
        .relation('books')
        .of(cart)
        .add(input.data.bookId);
    }

    const totalCost = book.price * input.data.quantity;

    const newTotalCost = (cart.total += totalCost);

    const updateQuantity = (cart.quantity += input.data.quantity);

    this.bookService.update({
      id: book.id,
      data: { quantity: book.quantity - input.data.quantity },
    });

    // Save changes to the database
    await this.cartRepository.update(cart.id, {
      total: newTotalCost,
      quantity: updateQuantity,
    });

    const updatedCart = await this.cartRepository.findOne({
      where: { id: cart.id },
    });

    return updatedCart;
  }

  async removeBookFromCart(
    input: RemoveBookFromCartDto,
  ): Promise<ResponseMessageSto> {
    const cart = await this.cartRepository.findOne({
      where: { id: input.cartId },
      relations: ['books'],
    });

    const removedBook = await this.cartRepository
      .createQueryBuilder('cart')
      .relation('books')
      .of(cart)
      .remove(input.bookId);

    await this.cartItemRepository.delete(input.cartItemId);

    return { message: 'Item removed successfully' };
  }

  async resetCart(input: ResetCartDto): Promise<ResponseMessageSto> {
    // Remove all books from the cart
    await this.cartRepository
      .createQueryBuilder('cart')
      .relation('books')
      .of(input.cartId)
      .remove([]);

    // Reset cart quantity and total

    await this.cartRepository.update(input.cartId, {
      quantity: 0,
      total: 0,
    });

    // Delete all related CartItem entities
    await this.cartItemRepository.delete({ cart: { id: input.cartId } });

    return { message: 'Cart Reset Successfully' };
  }
}
