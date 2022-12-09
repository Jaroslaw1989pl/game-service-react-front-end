// 3rd party components
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// custom style components
import './index.css';
// custom components
import App from './App';
import { ServerContextProvider } from './store/server-context';
import { FlashMessageContextProvider } from './store/flash-message-context';
import { UserContextProvider } from './store/user-context';
import { SocketioContextProvider } from './store/socketio-context';


const headerRoot = createRoot(document.getElementById('root'));
headerRoot.render(
  <ServerContextProvider>
    <UserContextProvider>
      <SocketioContextProvider>
        <FlashMessageContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FlashMessageContextProvider>
      </SocketioContextProvider>
    </UserContextProvider>
  </ServerContextProvider>
);