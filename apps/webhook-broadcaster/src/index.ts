import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';
import {
  initializeApp,
  // applicationDefault,
  // cert,
} from 'firebase-admin/app';
// const {
//   getFirestore,
//   Timestamp,
//   FieldValue,
//   Filter,
// } = require('firebase-admin/firestore');

initializeApp();
// const db = getFirestore();
const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  await app.init();
};
export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
