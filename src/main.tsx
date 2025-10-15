import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppBaseName } from './App.constants.ts';
import App from './App.tsx';
import './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={`/${AppBaseName}/`}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
