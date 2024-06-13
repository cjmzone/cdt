import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class ListenerService {
  constructor(private readonly firestoreService: FirestoreService) {}

  add(payload: string | string[]) {
    if (Array.isArray(payload)) {
      this.firestoreService.addListener(payload);
    } else {
      this.firestoreService.addListener(payload);
    }
  }

  async getAll() {
    return await this.firestoreService.getAllListeners();
  }

  async delete(url: string) {
    return await this.firestoreService.deleteListener(url);
  }
}
