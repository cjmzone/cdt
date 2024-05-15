import { Module } from '@nestjs/common';
import { ListenerService } from './listener.service';
import { ListenerController } from './listener.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ListenerService],
  controllers: [ListenerController],
  exports: [ListenerService],
})
export class ListenerModule {
  /* empty */
}
