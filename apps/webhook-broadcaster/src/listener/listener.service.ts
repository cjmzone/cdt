import { Injectable } from '@nestjs/common';
import { Listener } from './listener.types';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class ListenerService {
  private listeners: Map<string, Listener> = new Map();
  constructor(private readonly firestoreService: FirestoreService) {}

  async add(payload: string | string[]) {
    if (Array.isArray(payload)) {
      this.firestoreService.addListener(payload);
    } else {
      this.firestoreService.addListener(payload);
    }
  }

  async getAll(): Promise<Listener[]> {
    return await this.firestoreService.getAllListeners();
  }

  async delete(url: string) {
    return await this.firestoreService.deleteListener(url);
  }
}
