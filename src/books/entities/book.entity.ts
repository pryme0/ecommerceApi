import { CartItem } from 'src/cart/entities';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
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

  @ManyToMany(() => CartItem, (cartItem) => cartItem.book, { cascade: true })
  @JoinTable()
  cartItems: CartItem[];

  @ManyToMany(() => Cart, (cart) => cart.books)
  @JoinTable()
  cart: Cart[];

  @ManyToMany(() => Order, (order) => order.books)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;
}
