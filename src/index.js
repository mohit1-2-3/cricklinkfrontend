import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux-config/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId='801457418922-u3eh39idmlp4red25ek8k1fdf1u96vu5.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);
