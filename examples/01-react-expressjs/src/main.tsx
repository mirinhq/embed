import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EditorPage from './EditorPage';
import MainPage from './MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/editor/:documentId',
    element: <EditorPage />,
  },
  {
    path: '/',
    element: <MainPage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
