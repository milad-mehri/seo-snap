// pages/_app.js

"use client";

import { AuthProvider } from '../lib/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;


// import {SessionProvider} from 'next-auth/react'

// function MyApp({Component, pageProps, session }){
//     return (
//         <SessionProvider session={session}>
//             <Component{...pageProps} />
//         </SessionProvider>
//     )
// }

// export default MyApp