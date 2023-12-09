import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
  public entityName = 'orders';

  constructor(dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
}
