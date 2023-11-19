import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as cacheManager from 'cache-manager';
import * as memoryStore from 'cache-manager-memory-store';
import { OAuth2Client } from 'google-auth-library';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmailAuthGuard implements CanActivate {
  private readonly googleOAuthConfig = {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  };
  private readonly googleOAuthClient: OAuth2Client;
  // cacheManager: any;
  constructor(
    private readonly usersService: UsersService, // private readonly cacheManager: Cache, // Inject cache manager
  ) {
    this.googleOAuthClient = new OAuth2Client(this.googleOAuthConfig);
    // this.cacheManager = cacheManager.caching('memory', {
    //   max: 100,
    //   ttl: 60 * 1000,
    // });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return false;
    }

    // const decodedToken = this.jwtService.verify(token);
    // const userEmail = decodedToken.email;

    // Check if the email is cached, if not, fetch from the database
    // const decodedToken =
    // let userExists: any = await this.cacheManager.get(userEmail);
    // if (userExists === undefined) {
    //   userExists = await this.usersService.findByEmail(userEmail);
    //   this.cacheManager.set(userEmail, userExists, 60); // Cache for 60 seconds
    // }
    try {
      const res = await this.googleOAuthClient.verifyIdToken({
        idToken: token,
        audience: this.googleOAuthConfig.clientId,
      });
    } catch (error) {
      throw new UnauthorizedException('Failed Google Verification!');
    }

    return true;
  }
}
