import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import {
  RemoveBookFromCartDto,
  ResetCartDto,
  ResponseMessageDto,
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
      relations: ['books', 'cart_books_book'],
    });

    return carts;
  }

  async findOne(filter: FindCardByIdDto): Promise<CartDto> {
    const cart = await this.cartRepository.findOne({
      where: { ...filter },
      relations: ['cartItems', 'cartItems.book'],
    });

    return cart;
  }

  async addBookToCart(input: UpdateCartDto): Promise<CartDto> {
    // Find the cart
    const cart = await this.cartRepository.findOne({
      where: { id: input.id },
      relations: ['cartItems', 'cartItems.book'],
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
      throw new BadRequestException(`Out of Stock only `);
    }

    const existingCartItem = await this.cartItemRepository.findOne({
      where: { book: { id: input.data.bookId }, cart: { id: input.id } },
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
        .relation('cartItems')
        .of(cart)
        .add(input.data.bookId);
    }

    const totalCost = book.price * input.data.quantity;

    this.bookService.update({
      id: book.id,
      data: { quantity: book.quantity - input.data.quantity },
    });

    // Save changes to the database
    await this.cartRepository.update(cart.id, {
      total: cart.total + totalCost,
      quantity: cart.quantity + input.data.quantity,
    });

    const updatedCart = await this.cartRepository.findOne({
      where: { id: cart.id },
      relations: ['cartItems', 'cartItems.book'],
    });

    return updatedCart;
  }

  async removeBookFromCart(input: RemoveBookFromCartDto): Promise<CartDto> {
    const cart = await this.cartRepository.findOne({
      where: { id: input.cartId },
      relations: ['cartItems', 'cartItems.book'],
    });

    if (!cart) {
      throw new NotFoundException('Incorrect cart details');
    }

    const cartItem = await this.cartItemRepository.findOne({
      where: { book: { id: input.bookId }, cart: { id: input.cartId } },
      relations: ['book', 'cart'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart Item not found');
    }

    await this.cartRepository
      .createQueryBuilder('cart')
      .relation('cartItems')
      .of(cart)
      .remove(input.bookId);

    await this.cartItemRepository.delete(cartItem.id);

    const newQuantity = cart.quantity - cartItem.quantity;
    const totalLoss = cartItem.quantity * cartItem.book.price;
    const newTotal = cart.total - totalLoss;

    await this.cartRepository.update(cart.id, {
      quantity: newQuantity,
      total: newTotal,
    });

    const updatedCart = await this.cartRepository.findOne({
      where: { id: input.cartId },
      relations: ['cartItems', 'cartItems.book'],
    });

    return updatedCart;
  }

  async resetCart(input: ResetCartDto): Promise<CartDto> {
    // Remove all books from the cart

    const cart = await this.cartRepository.findOne({
      where: { id: input.cartId },
      relations: ['cartItems', 'cartItems.book'],
    });

    const queryUp = await this.cartRepository
      .createQueryBuilder('cart')
      .relation('cartItems')
      .of(input.cartId)
      .remove(cart.cartItems);

    // Reset cart quantity and total
    await this.cartRepository.update(input.cartId, {
      quantity: 0,
      total: 0,
    });

    // Delete all related CartItem entities
    await this.cartItemRepository.delete({ cart: { id: input.cartId } });

    const updatedCart = await this.cartRepository.findOne({
      where: { id: input.cartId },
    });

    return updatedCart;
  }
}
