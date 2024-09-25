// src/appwrite.js
import { Client, Account, ID, Databases } from 'appwrite';

// Initialize Appwrite client
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('66ba275a0024b6a2e174'); // Your Appwrite Project ID

// Initialize services
const account = new Account(client);
const databases = new Databases(client);

export { client, account, ID, databases };
