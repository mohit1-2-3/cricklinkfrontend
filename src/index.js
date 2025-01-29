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
  {/* <Auth0Provider
    domain="dev-zcj5rouifmqfpc7l.us.auth0.com"
    clientId="EVw6jxWTWwWLkZgJSyDzUj8aIqSqHJY0"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <App />
  </Auth0Provider>, */}
    <GoogleOAuthProvider clientId='771317770066-mumcjnlkakmj3t8osvgmj8mur30sttfi.apps.googleusercontent.com'>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);
