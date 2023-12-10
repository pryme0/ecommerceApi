import { CartItem } from 'src/cart/entities';
import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  thumbnail: string;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  rating: number;

  @Column()
  quantity: number;

  @Column({ type: 'varchar', array: true, default: '{}' })
  tags: string[];

  @ManyToMany(() => CartItem, (cartItem) => cartItem.book, { cascade: true })
  @JoinTable()
  cartItems: CartItem[];

  @ManyToMany(() => Order, (order) => order.books)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
