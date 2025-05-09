'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function HomePage() {

  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {

    if (isLoggedIn) {
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }

  }, [isLoggedIn, router])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Cargando...</h1>
    </div>
  )
}
