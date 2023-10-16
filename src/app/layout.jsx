import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './providers/providers'
const inter = Inter({ subsets: ['latin'] });
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title className='trainify'>Trainify.Me</title>
        <link rel="icon" type="image/png" href="favicon.png"></link>
      </head>
      <body className={inter.className} id="root">
        <NextAuthProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextAuthProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
