'use client'

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { store } from '@/store'
import { Provider } from 'react-redux'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from 'next-themes'

export function Providers({ children, session }: { children: React.ReactNode; session?: Session }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </Provider>
    </SessionProvider>
  )
}
