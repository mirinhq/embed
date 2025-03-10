import { Editor } from '@mirinhq/embed';

import '@mirinhq/embed/dist/index.css';
import { useParams } from 'react-router-dom';

function App() {
  const params = useParams<{ documentId: string }>();

  return (
    <Editor
      authenticate={async () => {
        const res = await fetch(
          `${import.meta.env['VITE_BACKEND_URL']}/authenticate/${params.documentId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const json = await res.json();

        return json;
      }}
    />
  );
}

export default App;
