import { Injectable } from '@nestjs/common';
import { Listener } from './listener.types';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class ListenerService {
  private listeners: Map<string, Listener> = new Map();
  constructor(private readonly firestoreService: FirestoreService) {}

  async add(payload: string | string[]) {
    console.log('Payload: ', payload, 'type: ', typeof payload);
    if (Array.isArray(payload)) {
      this.firestoreService.addListener(payload);
    } else {
      this.firestoreService.addListener(payload);
    }
  }

  async getAll(): Promise<Listener[]> {
    return await this.firestoreService.getAllListeners();
  }

  delete(url: string) {
    this.listeners.delete(url);
  }
}
