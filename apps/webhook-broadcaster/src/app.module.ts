import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ListenerModule } from './listener/listener.module';
import { WebhookModule } from './webhook/webhook.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ListenerModule,
    WebhookModule,
    HealthCheckModule,
    FirestoreModule,
  ],
})
export class AppModule {}
