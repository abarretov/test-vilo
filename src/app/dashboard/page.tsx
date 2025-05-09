'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth' 
import { fetchPosts } from '@/utils/api'
import { v4 } from 'uuid'
import styles from '@/styles/Dashboard.module.css'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export default function DashboardPage() {

  const { isLoggedIn, userEmail, logout } = useAuth()
  const router = useRouter()

  // --- Estados para Datos ---
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const limit = 10

  // --- Estados y Lógica para Filtros ---
  const [searchText, setSearchText] = useState('')

  /**
   * @function handleResetFilters
   * @description Resetea todos los filtros
   */
  const handleResetFilters = () => {
    setSearchText('')
  }

  /**
   * @function loadPosts
   * @description Función para cargar más posts
   */
  const loadPosts = useCallback(async () => {

    // Redirigir si no está logueado (protección de ruta)
    if (!isLoggedIn) {
      router.replace('/login')
      return // Detener la ejecución del efecto
    }

    if (!hasMore || loading) return
    
    setLoading(true)
    setError(null)
    
    try {

      const newPosts = await fetchPosts(page, limit)
      setPosts(prev => [...prev, ...newPosts])
      setHasMore(newPosts.length >= limit)
      setPage(prev => prev + 1)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, page, hasMore, loading])

  // Cargar datos
  useEffect(() => {

    // Solo cargar datos si estamos logueados
    if (isLoggedIn && !loading && !error) {
      loadPosts()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Configurar scroll infinito
  useEffect(() => {

    const container = containerRef.current
    if (!container || !hasMore) return

    const handleScroll = () => {

      const { scrollTop, scrollHeight, clientHeight } = container
      const threshold = 100 // Pixeles antes del final para cargar
      
      if (scrollHeight - (scrollTop + clientHeight) < threshold) {
        loadPosts()
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [loading, hasMore, loadPosts])

  useEffect(() => {

    if (!isLoggedIn) {
      router.replace('/login')
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  // Si no está logueado, no renderizar nada (la redirección se maneja en el useEffect)
  if (!isLoggedIn) {
    return null
  }

  return (

    <div className={ styles.container }>

      {/* Cabecera */}
      <header className={ styles.header }>
        <div>
          <h1>Dashboard</h1>
          { userEmail && <p className={ styles.userInfo }>Bienvenido, { userEmail }</p>}
        </div>
        <button className={ styles.logoutButton } onClick={ logout }>Cerrar Sesión</button>
      </header>

      {/* Filtro */}
      <div className={ styles.filters }>
        <div className={ styles.filterGroup }>
          <label htmlFor="searchText" className={ styles.filterLabel }>Buscar</label>
          <input
            type="text"
            id="searchText"
            className={ styles.filterInput }
            value={ searchText }
            onChange={ (e) => setSearchText(e.target.value) }
            placeholder="Ej: sun, great..."
          />
        </div>

        {/* Mostrar botón de reset si hay algún filtro aplicado */}
        { searchText && (
          <button onClick={ handleResetFilters } className={ styles.resetButton }>
            Resetear Filtros
          </button>
        )}
      </div>

      {/* Cuerpo */}
      <div ref={ containerRef } style={{ height: '100vh', overflowY: 'auto', }}>
        
        {/* Listado de post */}
        <ul className={  styles.postList }>
          { posts.filter(post => !searchText || post.title.toLowerCase().includes(searchText.toLowerCase())).map(post => (
            <li key={ v4() } className={ styles.postItem }>
              <p className={ styles.postId }>ID: { post.id }</p>
              <h2 className={ styles.postTitle }>{ post.title }</h2>
              <p className={ styles.postBody }>{ post.body }</p>
            </li>
          ))}
        </ul>

        {/* Estados de carga y error */}
        { loading && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            Cargando más posts...
          </div>
        )}

        { error && (
          <div className={ styles.error }>
            { error }
          </div>
        )}

        { !hasMore && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            ¡Has llegado al final!
          </div>
        )}
      </div>
    </div>
  )
}
