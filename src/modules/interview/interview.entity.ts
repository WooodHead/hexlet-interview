import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('interview')
export class Interview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: maybe need enum type? and set db column?
  @Column()
  state: string; // 'application' | 'coming' | 'passed' | 'canceled';

  @ManyToOne(() => User, user => user.interviews)
  @JoinColumn({ name: 'interviewee_id' })
  interviewee: User;

  @ManyToOne(() => User, user => user.interviews)
  @JoinColumn({ name: 'interviewer_id' })
  interviewer: User | null;

  @Column()
  profession: string;

  @Column()
  position: string;

  @Column()
  description: string;

  @Column({ name: 'video_link' })
  videoLink: string;

  @Column()
  date: Date;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  setDefaults(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}
