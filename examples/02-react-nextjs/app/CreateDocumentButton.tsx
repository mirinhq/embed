'use client';

import { createDocument } from '@/lib/server';

export const CreateDocumentButton = () => {
  return (
    <button
      className="rounded-md px-2.5 py-1 text-sm bg-neutral-100 text-neutral-700"
      onClick={async () => {
        await createDocument({
          title: 'A new doc',
        });
      }}
    >
      Create new Document
    </button>
  );
};
