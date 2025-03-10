'use server';

import { Client } from '@mirinhq/admin';
import { revalidatePath } from 'next/cache';

const client = new Client({
  privateApiKey: process.env['MIRIN_EMBED_PRIVATE_KEY']!,
});

export const getDocuments = async () => {
  return await client.getDocuments();
};

export const createDocument = async (
  ...args: Parameters<typeof client.createDocument>
) => {
  await client.createDocument(...args);
  revalidatePath('/');
};

export const authenticate = async (documentId: string) => {
  const res = await client.authorize({
    documentId,
  });

  return res.token;
};
