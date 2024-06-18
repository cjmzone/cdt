import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { ListenerModule } from '../listener/listener.module';
import { FirestoreModule } from 'src/firestore/firestore.module';

@Module({
  imports: [ListenerModule, FirestoreModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {
  /* empty */
}
