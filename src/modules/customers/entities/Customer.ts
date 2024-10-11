import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ type: 'date' })
  birth_date: Date

  @Column()
  cpf: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column({ type: 'timestamp with time zone', nullable: true, default: null })
  excluded_at: Date | null

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: null
  })
  updated_at: Date | null
}
