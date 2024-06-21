import { Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhooks')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);
  constructor(private readonly webhookService: WebhookService) {}

  @Post('*')
  async webhookRequest(@Req() request: Request) {
    const data: any = request.body;
    const headers: Record<string, string | string[]> = request.headers;
    const path: string = request.path.replace('/webhooks', '');

    this.logger.log(`[webhook_request] ${path}`);
    await this.webhookService.broadcastWebhook({
      data,
      headers,
      path,
    });
  }
}
