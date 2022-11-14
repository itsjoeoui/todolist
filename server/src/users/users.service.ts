import { Injectable } from '@nestjs/common';
import { User } from './users.model';

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    const u1 = new User();
    u1.id = 1;
    u1.email = 'john';
    u1.password = 'changeme';
    u1.display_name = 'u1';
    if (username == u1.email) {
      return u1;
    }
    return;
  }
}
