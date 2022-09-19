// 3rd party components
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// custom style components
import './index.css';
// custom components
import App from './App';
import { ServerContextProvider } from "./store/server-context";


const headerRoot = createRoot(document.getElementById('root'));
headerRoot.render(
  <ServerContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ServerContextProvider>
);