import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function MainPage() {
  const queryClient = useQueryClient();

  const { data: documentsData } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/document`, {
        method: 'GET',
      });

      return (await res.json()) as any[];
    },
  });

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/create-document`, {
        method: 'POST',
        headers: {
          ContentType: 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
    },
  });

  return (
    <div className="p-8 flex flex-col gap-10">
      <div className="flex items-center gap-2">
        <span className="text-2xl">Documents</span>
        <button
          className="rounded-md bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200"
          onClick={() => {
            mutation.mutate();
          }}
        >
          Create new
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {documentsData?.map((document) => (
          <li key={document.id}>
            <div className="flex items-center gap-2">
              {document.id}
              <Link
                to={`/editor/${document.id}`}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200"
              >
                <span>Edit</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
