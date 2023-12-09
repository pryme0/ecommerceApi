import { NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';

export interface IBaseRepository<T = any> {
  entityName: string;
  existsOrFail: (options?: FindOneOptions<T>) => Promise<T>;
}

export class BaseRepository<T>
  extends Repository<T>
  implements IBaseRepository<T>
{
  public entityName = 'Entity';

  async existsOrFail(options?: FindOneOptions<T>): Promise<T> {
    const opt = await this.findOne(options);
    if (!opt) {
      throw new NotFoundException(`${this.entityName} not found.`);
    }
    return opt;
  }
}
