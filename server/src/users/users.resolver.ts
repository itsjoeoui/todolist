import { Args, Resolver, Query } from '@nestjs/graphql';
import { User } from './users.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => User)
  async user(@Args('email') id: string): Promise<User | undefined> {
    return this.userService.findOne(id);
  }
}
