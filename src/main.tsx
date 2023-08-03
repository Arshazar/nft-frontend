import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/global.css';
import App from './App.tsx';
import { QueryProvider } from './components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>
);
