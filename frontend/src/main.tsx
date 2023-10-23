import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react';
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
const auth0ClientID = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
import './index.css'
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './utilities/apolloClient.ts';
import store from './store/store.ts';
import { Provider } from 'react-redux';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientID}
        {...{ redirectUri: window.location.origin }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </ApolloProvider>
  </React.StrictMode>,
)
