// components/Logout.js

"use client";

import { useAuth } from '../lib/AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
};

export default Logout;
