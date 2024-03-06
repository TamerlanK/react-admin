import React, { createContext, useState, useEffect, ReactNode } from "react"
import axios, { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
import { UserDataType } from "../lib/types"
import useLocalStorage from "../hooks/useLocalStorage"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const api = axios.create({
  baseURL: "https://dummyjson.com/auth",
})

export interface AuthContextType {
  token: string | null
  user: UserDataType | null
  loginAction: (data: { username: string; password: string }) => Promise<void>
  logOut: () => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataType | null>(null)
  const [token, setToken] = useLocalStorage<string | null>("token", null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response: AxiosResponse<UserDataType> = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        console.error("Error fetching user data:", error)
        logOut()
      }
    }

    if (token) {
      fetchUserData()
    }
  }, [token])

  const loginAction = async (data: { username: string; password: string }) => {
    try {
      const response: AxiosResponse<{ token: string }> = await api.post(
        "/login",
        data
      )
      setToken(response.data.token)
      navigate("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error.message)
      throw new Error("Failed to log in")
    }
  }

  const logOut = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
