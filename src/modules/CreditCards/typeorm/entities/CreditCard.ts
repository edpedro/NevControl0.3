import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '../../../Users/typeorm/entities/User';

@Entity('creditCards')
class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column('decimal')
  limit: number;

  @Column()
  close: string;

  @Column()
  win: string;

  @Column()
  bank: string;

  @Column()
  cardBalance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CreditCard;
