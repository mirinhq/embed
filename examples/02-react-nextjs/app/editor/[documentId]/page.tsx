'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';

import { Editor } from '@mirinhq/embed';
import '@mirinhq/embed/dist/index.css';

import { authenticate } from '@/lib/server';

export default function EditorPage() {
  const { documentId } = useParams<{ documentId: string }>();

  return (
    <Editor
      authenticate={async () => {
        const token = await authenticate(documentId);

        return {
          token,
          documentId,
        };
      }}
    />
  );
}
