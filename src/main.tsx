import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'

const isDevelopment = process.env.NODE_ENV === 'development';

createRoot(document.getElementById('root')!).render(
  isDevelopment ? (
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  ) : (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
);
