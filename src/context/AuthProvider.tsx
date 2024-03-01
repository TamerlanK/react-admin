import React, { createContext, useState, useEffect, ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface UserData {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}

interface AuthContextType {
  token: string
  user: UserData | null
  loginAction: (data: { username: string; password: string }) => Promise<void>
  logOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null)
  const [token, setToken] = useState<string>(() => {
    const storedToken = localStorage.getItem("token")
    return storedToken || ""
  })
  const navigate = useNavigate()

  useEffect(() => {
    const storedUserData = localStorage.getItem("user")
    if (storedUserData) {
      setUser(JSON.parse(storedUserData))
    }
  }, [])

  const loginAction = async (data: { username: string; password: string }) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const userData: UserData = await response.json()
        setUser(userData)
        setToken(userData.token)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", userData.token)
        navigate("/dashboard")
      } else {
        throw new Error("Failed to log in")
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const logOut = () => {
    setUser(null)
    setToken("")
    localStorage.removeItem("user")
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
