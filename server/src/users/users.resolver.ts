import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { User } from './users.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(() => User)
  async user(@Args('email') email: string): Promise<User> {
    return this.userService.find_one(email);
  }

  @Mutation()
  async create_user(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('display_name') display_name: string,
  ): Promise<string> {
    await this.userService.create_user(email, password, display_name);
    return 'succeed';
  }

  @Mutation()
  async remove_user(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    await this.userService.remove_user(email, password);
    return 'succeed';
  }

  @Mutation()
  async update_password(
    @Args('email') email: string,
    @Args('old_password') old_password: string,
    @Args('new_password') new_password: string,
  ): Promise<string> {
    await this.userService.update_password(email, old_password, new_password);
    return 'succeed';
  }
}
