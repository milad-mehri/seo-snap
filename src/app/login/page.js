// pages/login.js

"use client";
import { AuthProvider } from '../lib/AuthContext';
import GoogleSignIn from '../components/GoogleSignIn';

const LoginPage = () => {
  return (
    <div>
        <AuthProvider><
            h1>Login</h1>
            <GoogleSignIn />
      </AuthProvider>
      
    </div>
  );
};

export default LoginPage;


