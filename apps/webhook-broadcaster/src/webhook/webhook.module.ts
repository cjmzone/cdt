import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { ListenerModule } from '../listener/listener.module';

@Module({
  imports: [ListenerModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {
  /* empty */
}
