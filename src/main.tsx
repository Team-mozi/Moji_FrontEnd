import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import ToastProvider from '@/components/ToastProvider';
import router from '@/routes';
import { store } from '@/store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </Provider>
  </StrictMode>,
);
