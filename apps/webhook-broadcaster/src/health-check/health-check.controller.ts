import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get()
  getStatus() {
    return { status: 'ok' };
  }
}
