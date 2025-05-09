
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * @function fetchPosts
 * @description Obtiene posts de JSONPlaceholder con paginación
 * @param {number} page - Número de página (base 1)
 * @param {number} limit - Número de posts por página
 * @returns {Promise<any[]>} Promesa que resuelve con un array de posts
 * @throws {Error} Si la solicitud falla
 */
export const fetchPosts = async (page: number, limit: number) => {

  try {

    const response = await fetch(`${ API_BASE_URL }/posts?_page=${ page }&_limit=${ limit }`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error ${ response.status }: ${ response.statusText } - ${ errorText || 'Unknown error' }`)
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error('Error fetching posts:', error)
    throw new Error(`No se pudieron cargar los datos. Intente nuevamente. Detalle: ${ (error as Error).message }`)
  }
}
