// components/GoogleSignIn.js

"use client";

import { useAuth } from '../lib/AuthContext';

const GoogleSignIn = () => {
  const { loginWithGoogle } = useAuth();
  console.log('GoogleSignIn loginWithGoogle:', loginWithGoogle);

  return <button onClick={loginWithGoogle}>Sign in with Google</button>;
};

export default GoogleSignIn;
