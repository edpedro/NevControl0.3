import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import CreditCard from '../../../CreditCards/typeorm/entities/CreditCard';
import User from '../../../Users/typeorm/entities/User';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CreditCard, { eager: true })
  @JoinColumn({ name: 'creditCard_id' })
  creditCard: CreditCard;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  description: string;

  @Column('decimal')
  value: number;

  @Column()
  data: string;

  @Column()
  category: string;

  @Column()
  type: string;

  @Column()
  operation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
