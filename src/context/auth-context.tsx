'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  userEmail: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

// Crear el Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock de credenciales de autenticación
const MOCK_EMAIL = 'test@example.com'
const MOCK_PASSWORD = 'password123' // Mínimo 6 caracteres

/**
 * @function AuthProvider
 * @description Proveedor para el Contexto de Autenticación
 * Maneja el estado de autenticación (logueado/no logueado, email del usuario)
 * y proporciona funciones para login y logout (mockeadas)
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  /**
   * @function login
   * @description Simula el proceso de inicio de sesión.
   * @param {string} email - Email del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<{ success: boolean error?: string }>} Promesa que resuelve con el resultado del login.
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {

    // Simular una llamada a API con retardo
    await new Promise(resolve => setTimeout(resolve, 500))

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      setIsLoggedIn(true)
      setUserEmail(email)
      return { success: true }
    } else {
      return { success: false, error: 'Credenciales incorrectas' }
    }
  }

  /**
   * @function logout
   * @description Simula el cierre de sesión.
   */
  const logout = () => {
    setIsLoggedIn(false)
    setUserEmail(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}

/**
 * @function useAuth
 * @description Hook personalizado para consumir el Contexto de Autenticación.
 * Facilita el acceso al estado y funciones de autenticación.
 * @returns {AuthContextType} El contexto de autenticación.
 * @throws {Error} Si useAuth es usado fuera de un AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
