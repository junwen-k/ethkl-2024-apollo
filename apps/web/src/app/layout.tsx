import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import * as React from 'react'
import { cookieToInitialState } from 'wagmi'

import { getConfig } from '../wagmi'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Apollo',
  description: 'Neighbourhood blockchain powered app.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(getConfig(), headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  )
}
