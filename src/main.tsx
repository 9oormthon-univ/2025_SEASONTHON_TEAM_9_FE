// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Failed to find the root element');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
