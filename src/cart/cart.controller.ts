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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import {
  RemoveBookFromCartDto,
  ResponseMessageSto,
  UpdateCartDto,
} from './dto/update-cart-item.dto';
import { CartDto, FindCardByIdDto, FindCartDto } from './dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UpdateResultDto, UserDto } from 'src/users/dto';
import { GetUser, JwtGuard } from 'src/helpers';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: CartDto,
    description: 'Create a users cart',
  })
  @HttpCode(200)
  @Post()
  @UseGuards(JwtGuard)
  async create(
    @Body() input: CreateCartDto,
    @GetUser() user: UserDto,
  ): Promise<CartDto> {
    return await this.cartService.create(input, user);
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: [CartDto],
    description: 'Get users carts',
  })
  @HttpCode(200)
  @Get()
  @UseGuards(JwtGuard)
  async findAll(@Query('filter') filter: FindCartDto): Promise<CartDto[]> {
    return await this.cartService.findAll(filter);
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: CartDto,
    description: 'Get a single cart',
  })
  @HttpCode(200)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne({ id });
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: CartDto,
    description: 'Inserts a book into the cart',
  })
  @HttpCode(200)
  @Patch(':id')
  addBookToCart(
    @Param('id') id: string,
    @Body() body: UpdateCartDto,
  ): Promise<CartDto> {
    return this.cartService.addBookToCart({ ...body, id });
  }

  @ApiBearerAuth('JWT-TOKEN')
  @ApiOkResponse({
    status: 200,
    type: ResponseMessageSto,
    description: 'Removes a book from a cart',
  })
  @HttpCode(200)
  @Post('/remove-item')
  removeBookFromCart(
    @Body() body: RemoveBookFromCartDto,
  ): Promise<ResponseMessageSto> {
    return this.cartService.removeBookFromCart(body);
  }
}
