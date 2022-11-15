import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  find_one(email: string): Promise<User> {
    return this.usersRepository.findOneByOrFail({ email: email });
  }

  async create_user(
    email: string,
    password: string,
    display_name: string,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    user.display_name = display_name;

    return this.usersRepository.save(user);
  }

  async remove_user(email: string, password: string): Promise<void> {
    const user = await this.find_one(email);

    if (user.password == password) {
      await this.usersRepository.delete({ email: email });
    } else {
      throw new UnauthorizedException();
    }
  }

  async update_password(
    email: string,
    old_password: string,
    new_password: string,
  ): Promise<void> {
    const user = await this.find_one(email);
    if (user.password == old_password) {
      user.password = new_password;
      this.usersRepository.save(user);
    } else {
      throw new UnauthorizedException();
    }
  }
}
