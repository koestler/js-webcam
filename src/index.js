import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './components/App'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './hooks/auth'

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
