import { Module } from '@nestjs/common';
import { ListenerService } from './listener.service';
import { ListenerController } from './listener.controller';
import { ConfigModule } from '@nestjs/config';
import { FirestoreModule } from '../firestore/firestore.module';

@Module({
  imports: [ConfigModule.forRoot(), FirestoreModule],
  providers: [ListenerService],
  controllers: [ListenerController],
  exports: [ListenerService],
})
export class ListenerModule {
  /*  empty   */
}
