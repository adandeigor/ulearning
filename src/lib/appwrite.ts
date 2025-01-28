import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67773b3400015b0d3fc3'); // Replace with your project ID

export const StorageAccount = new Account(client);
export { ID } from 'appwrite';
