import { useState, useEffect } from 'react'
import { apiRequest } from '../lib/api'

interface User {
  username: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const userStr = localStorage.getItem('adminUser')
      
      if (!token || !userStr) {
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        })
        return
      }

      // Verificar token con el servidor
      const res = await apiRequest('/api/auth-check', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        const user = JSON.parse(userStr)
        setAuthState({
          user,
          token,
          isLoading: false,
          isAuthenticated: true,
        })
      } else {
        // Token inválido, limpiar storage
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  return {
    ...authState,
    logout,
    checkAuthStatus,
  }
}