import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly configSecret: string;
  constructor(private configService: ConfigService) {
    this.configSecret =
      this.configService.get<string>('WEBHOOK_SECRET') ?? 'secret';
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const headerSecret = request.headers['secret'];
    return this.validateRequest(headerSecret);
  }

  validateRequest(headerSecret: string): boolean {
    return this.configSecret === headerSecret;
  }
}
