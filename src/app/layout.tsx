import './globals.css'
import { Poppins } from 'next/font/google'
import { Providers } from '@/Store/Provider'
import {ToastProvider} from '@/Store/ToastProvider'
//import 'react-toastify/dist/ReactToastify.css';
//import { ToastContainer } from 'react-toastify';

const poppin = Poppins({
  weight: ['100', '400'],
  subsets: ['latin'],
})


export const metadata = {
  title: 'Ecommerce Next App',
  description: 'Developed by Hasan Afif for Havebreak Company',
  authors: [{ name: "Hasan Afif", url: 'https://e-commerce-platform-6x26.vercel.app/' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) { 
  return (
    <html lang="en">
      <body className={poppin.className}>
        <Providers>
        <ToastProvider />
          {children}
        </Providers>
      </body>

    </html>
  )
}
