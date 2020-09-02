import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        email: 'john@test.com',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        email: 'chris@test.com',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        email: 'maria@test.com',
      },
    ];
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email ===  email)
    console.log(user);
    return user;
  }
}
