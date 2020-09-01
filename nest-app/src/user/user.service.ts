import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    findById(id: string): string{
        return `Hello ${id}`;
    }
}
