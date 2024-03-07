import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import PrivateRoute from "./PrivateRoute"
import Dashboard from "./Dashboard"
import { useAuth } from "./context/AuthProvider"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import { useSidebar } from "./store/useSidebar"

const App: React.FC = () => {
  const auth = useAuth()
  const { collapsed } = useSidebar()

  return (
    <div className="flex flex-col h-screen antialiased">
      <Header />
      <div
        className={`flex flex-grow transition-all duration-300 ${
          auth.user && "p-14 pr-0"
        } ${auth.user && (collapsed ? "pl-[88px]" : "pl-64")}`}
      >
        {auth.user && <Sidebar />}
        <div className="flex-grow">
          <Routes>
            <Route
              path="/login"
              element={auth.user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/register"
              element={auth.user ? <Navigate to="/dashboard" /> : <Register />}
            />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
      {auth.user && <Footer />}
    </div>
  )
}

export default App
