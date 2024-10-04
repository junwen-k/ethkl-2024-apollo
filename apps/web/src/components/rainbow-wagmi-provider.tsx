'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { type State, WagmiProvider } from 'wagmi'

import { getConfig } from '@/wagmi'

export const RainbowWagmiProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode
  initialState?: State
}) => {
  const [config] = React.useState(() => getConfig())
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#171717',
            accentColorForeground: '#FAFAFA',
            borderRadius: 'medium',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
