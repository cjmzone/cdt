import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ListenerModule } from './listener/listener.module';
import { WebhookModule } from './webhook/webhook.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ListenerModule,
    WebhookModule,
    HealthCheckModule,
  ],
})
export class AppModule {}