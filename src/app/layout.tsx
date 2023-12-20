import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { ClerkProvider } from '@clerk/nextjs'
import Migration from './_migration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <UserProvider>
          <body className={inter.className}>
            <Migration />
            {children}
          </body>
        </UserProvider>
      </ClerkProvider>
    </html >
  )
}