import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { CartItem } from '../cart/entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class CartItemRepository extends BaseRepository<CartItem> {
  public entityName = 'cartItem';

  constructor(dataSource: DataSource) {
    super(CartItem, dataSource.createEntityManager());
  }
}
