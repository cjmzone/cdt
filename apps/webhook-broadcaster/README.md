# Webhook Broadcaster

This application provides a webhook broadcasting service that forwards incoming webhooks to a list of registered listeners. It's built with NestJS and uses Firebase Firestore for storing listener URLs.

## Components

### WebhookService

Handles the broadcasting of webhooks to all registered listeners.

### FirestoreService

Manages the interactions with Google Firebase including adding, getting, and deleting listener URLs.

### ListenerService

An interface for managing the listener URLs.

### Server Setup

Uses Express with NestJs to handle HTTP requests.

### CICD

Utilizies GitHub actions and deploys to Firebase everytime we push to main.

## Setup

### Prerequisites

- Node.js
- `pnpm`
- Firebase project service account key

### Installation

1. Clone the repo.

`git clone https://github.com/logicandrhythm/current-development-tools.git`
`cd webhook-broadcaster`

2. Install dependcies
   `pnpm build`

3. Add your Firebase service account key in the project root.
   - example: firestoreServiceAccountKey.json

### Run Locally

`pnpm start:dev`
