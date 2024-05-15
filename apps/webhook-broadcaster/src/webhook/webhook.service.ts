import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ListenerService } from '../listener/listener.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  constructor(private readonly listenerService: ListenerService) {}

  /**
   * Broadcasts a webhook to all registered listeners
   */
  async broadcastWebhook({
    data,
    headers,
    path,
  }: {
    data: any;
    headers: Record<string, string | string[]>;
    path: string;
  }) {
    const registeredListeners = this.listenerService.getAll();
    for (const listener of registeredListeners) {
      const targetUrl = listener.url + path;
      try {
        // proxy the request to the listener
        await axios.post(targetUrl, data, {
          headers: {
            ...headers,
            host: undefined,
          },
        });

        this.logger.log(`[broadcast_webhook] [success] ${targetUrl}`);
      } catch (error) {
        this.logger.warn(
          `[broadcast_webhook] [fail] ${targetUrl}`,
          error.message,
        );
      }
    }
  }
}
