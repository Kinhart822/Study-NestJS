import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Phone } from './phone.entity';

@Entity()
export class JwtUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // @Column({name : 'refresh_token', nullable: true})
  @Column({ default: 'N/A' })
  refreshToken: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // cascade là khi thực hiện một thao tác (save, update, remove, v.v.) trên
  //      một entity cha, ORM sẽ tự động thực hiện thao tác tương ứng lên
  //      entity con liên kết với nó.
  // => Chỉ lên đặt khi cả 2 entity sống chết cùng nhau

  // onDelete: Database sẽ tự động xóa bản ghi Phone có user_id = 1. Không cần
  //      TypeORM phải gửi thêm câu lệnh DELETE FROM phone ... mà sql sẽ tự xử
  //      lý đảm bảo tính toàn vẹn.
  @OneToOne(() => Phone, (phone) => phone.jwtUser, {
    cascade: true,        
    onDelete: 'CASCADE',
  })
  @JoinColumn() 
  phone: Phone;
}
