import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/Components/Navbar'
import { getServerSession } from 'next-auth'
import AuthProvider from "@/Utils/SessionProvider";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const RootLayout = async (props: any) => {
  const { children, }: { children: React.ReactNode } = props;
  const session = await getServerSession();
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
export default RootLayout;
