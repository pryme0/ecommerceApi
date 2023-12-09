import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  public entityName = 'users';

  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
