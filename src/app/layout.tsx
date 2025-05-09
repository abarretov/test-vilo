import type { Metadata } from 'next'
import { AuthProvider } from '@/context/auth-context'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Vilo Test',
  description: '',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          { children }
        </AuthProvider>
      </body>
    </html>
  )
}
