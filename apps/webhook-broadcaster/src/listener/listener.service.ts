import { Injectable } from '@nestjs/common';
import { Listener } from './listener.types';

@Injectable()
export class ListenerService {
  private listeners: Map<string, Listener> = new Map();

  add(payload: string | string[]) {
    if (Array.isArray(payload)) {
      payload.forEach((url) => {
        this.listeners.set(url, { url });
      });
    } else {
      this.listeners.set(payload, { url: payload });
    }
  }

  getAll(): Listener[] {
    return Array.from(this.listeners.values());
  }

  delete(url: string) {
    this.listeners.delete(url);
  }
}
