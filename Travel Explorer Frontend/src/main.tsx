import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google";
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { store, persistor } from './redux/store.ts';
import { PersistGate} from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import "./i18n.ts"

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div style={{ padding: 20, color: 'red', fontSize: 24 }}>Loading Persisted State...</div>} persistor={persistor}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
