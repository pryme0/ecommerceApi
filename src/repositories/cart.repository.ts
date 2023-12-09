import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { Cart } from '../cart/entities';
import { BaseRepository } from './base.repository';

@Injectable()
export class CartRepository extends BaseRepository<Cart> {
  public entityName = 'carts';

  constructor(dataSource: DataSource) {
    super(Cart, dataSource.createEntityManager());
  }
}
