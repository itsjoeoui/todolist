import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Field({ nullable: false })
  @Column()
  display_name: string;
}
