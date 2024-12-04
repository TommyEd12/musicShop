import React from 'react'
import AuthForm from '../components/AuthForm/AuthForm'

const AuthPage: React.FC = () => {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column justify-content-center align-items-center p-4">
      <header className="mb-4">
        <h1 className="display-4 fw-bold">My App</h1>
      </header>
      <div className="card w-100" style={{ maxWidth: '400px' }}>
        <div className="card-header">
          <h2 className="card-title h5 mb-0">Sign In</h2>
        </div>
        <div className="card-body">
          <p className="card-text mb-4">Enter your email and password to access your account.</p>
          <AuthForm />
        </div>
      </div>
    </div>
  )
}

export default AuthPage

