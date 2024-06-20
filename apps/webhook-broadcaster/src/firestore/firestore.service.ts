import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from 'newServiceKey.json';
import { Listener } from 'src/listener/listener.types';

@Injectable()
export class FirestoreService {
  private database: FirebaseFirestore.Firestore;
  private readonly logger = new Logger(FirestoreService.name);

  constructor() {
    try {
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount,
          ),
        });
      }
      this.database = admin.firestore();
    } catch (error) {
      this.logger.error('Error intializing Firestore ', error);
    }
  }

  async addListener(listener: string | string[]) {
    try {
      const listenerDoc = { urls: listener };
      await this.database.collection('listeners').doc('urls').set(listenerDoc);
      console.log(listener, ' successfully written!');
    } catch (error) {
      this.logger.error('Error adding listener to Firestore ', error);
    }
  }

  async getAllListeners() {
    try {
      const snapshot = await this.database.collection('listeners').get();
      const listeners: Listener[] = snapshot.docs.map(
        (doc) => doc.data() as Listener,
      );
      return listeners;
    } catch (error) {
      this.logger.error('Error getting listeners from Firestore', error);
    }
  }

  async deleteListener(listenerToDelete: string) {
    try {
      const snapshot = await this.database
        .collection('listeners')
        .doc('urls')
        .get();
      if (!snapshot.exists) {
        console.log('Document does not exist.');
        return;
      }
      const listenersData = snapshot.data();
      if (!Array.isArray(listenersData.urls)) {
        console.log('Invalid document data');
        return;
      }
      const updatedUrls = listenersData.urls.filter(
        (url) => url !== listenerToDelete,
      );
      await snapshot.ref.update({ urls: updatedUrls });
      console.log('Listener deleted.');
    } catch (error) {
      this.logger.error('Error deleting listener from Firestore', error);
    }
  }
}
