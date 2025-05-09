'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import styles from '@/styles/Login.module.css'

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { isLoggedIn, login } = useAuth()
  const router = useRouter()

  // Redirigir al dashboard si ya está logueado
  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/dashboard')
    }
  }, [isLoggedIn, router])

  /**
   * @function validateForm
   * @description Valida los campos del formulario de login.
   * @returns {boolean} True si el formulario es válido, false en caso contrario.
   */
  const validateForm = (): boolean => {

    let isValid = true

    // Validación de Email (formato básico)
    if (!email) {
      setEmailError('El email es requerido.')
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('El formato del email no es válido.')
      isValid = false
    } else {
      setEmailError('')
    }

    // Validación de Contraseña (mínimo 6 caracteres)
    if (!password) {
      setPasswordError('La contraseña es requerida.')
      isValid = false
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.')
      isValid = false;
    } else {
      setPasswordError('')
    }

    setApiError('')
    return isValid
  }

  /**
   * @function handleSubmit
   * @description Maneja el envío del formulario. Valida, llama a la función de login
   * y maneja la respuesta
   * @param {React.FormEvent<HTMLFormElement>} event - Evento del formulario
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    if (validateForm()) {

      setIsLoading(true)
      const result = await login(email, password)
      setIsLoading(false)

      if (!result.success) {
        setApiError(result.error || 'Error de autenticación.')
      }
    }
  };

  // Si ya está logueado, no renderizar el formulario, el useEffect manejará la redirección
  if (isLoggedIn) {
    return null
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.loginBox }>
        <h1 className={ styles.title }>Iniciar Sesión</h1>
        <form onSubmit={ handleSubmit }>
          <div className={ styles.formGroup }>
            <label htmlFor="email" className={ styles.label }>Email</label>
            <input
              type="email"
              id="email"
              className={ `${ styles.input } ${ emailError ? styles.inputError : '' }` }
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              required
            />
            { emailError && <span className={ styles.validationError }>{ emailError }</span> }
          </div>

          <div className={ styles.formGroup }>
            <label htmlFor="password" className={ styles.label }>Contraseña</label>
            <input
              type="password"
              id="password"
              className={ `${ styles.input } ${ passwordError ? styles.inputError : '' }` }
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              required
            />
            { passwordError && <span className={ styles.validationError }>{ passwordError }</span> }
          </div>

          <button
            type="submit"
            className={ styles.button }
            disabled={ isLoading } // Deshabilitar botón mientras carga
          >
            { isLoading ? 'Iniciando...' : 'Entrar' }
          </button>

          { apiError && <p className={ styles.apiError }>{ apiError }</p> }
        </form>
      </div>
    </div>
  );
}