import * as postmark from 'postmark';

let client: postmark.ServerClient | null = null;

export function getPostmarkClient(): postmark.ServerClient {
  if (!client) {
    client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN!);
  }
  return client;
}

export const POSTMARK_FROM_EMAIL = process.env.POSTMARK_FROM_EMAIL || 'hello@blackandwhiteboy.com';
