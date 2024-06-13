import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { FirestoreService } from 'src/firestore/firestore.service';
import { Listener } from 'src/listener/listener.types';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  constructor(private readonly firestoreService: FirestoreService) {}

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
    const registeredListeners =
      (await this.firestoreService.getAllListeners()) ?? [];
    for (const listener of registeredListeners[0]?.urls) {
      const targetUrl = `${listener}${path}`;
      try {
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
