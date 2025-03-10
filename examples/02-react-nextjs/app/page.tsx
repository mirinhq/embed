import { getDocuments } from '@/lib/server';
import Link from 'next/link';

import { CreateDocumentButton } from './CreateDocumentButton';

export default async function Dashboard() {
  const { documents } = await getDocuments();

  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="flex items-center gap-5">
        <h2 className="text-xl">Documents</h2>
        <CreateDocumentButton />
      </div>
      {documents.length === 0 ? (
        <p>No documents</p>
      ) : (
        <ul className="flex flex-col">
          {documents.map((document) => {
            return (
              <li className="w-full" key={document.id}>
                <Link href={`/editor/${document.id}`}>{document.id}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
