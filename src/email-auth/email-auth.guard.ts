import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmailAuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cacheManager: Cache, // Inject cache manager
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return false;
    }

    const decodedToken = this.jwtService.verify(token);
    const userEmail = decodedToken.email;

    // Check if the email is cached, if not, fetch from the database
    let userExists: any = await this.cacheManager.get(userEmail);
    if (userExists === undefined) {
      userExists = await this.usersService.findByEmail(userEmail);
      this.cacheManager.set(userEmail, userExists, 60); // Cache for 60 seconds
    }

    return userExists;
  }
}
