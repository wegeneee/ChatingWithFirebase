import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContenxProvide } from './Context/AuthContext';
import { ChatContextProvide } from './Context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthContenxProvide>
    <ChatContextProvide>
      <React.StrictMode>
        <App />
        </React.StrictMode>
    </ChatContextProvide>
  </AuthContenxProvide>
 
);

