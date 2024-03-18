import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import PrivateRoute from "./PrivateRoute"
import { useAuth } from "./context/AuthProvider"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import { useSidebar } from "./store/useSidebar"
import {
  Login,
  Register,
  Dashboard,
  Products,
  Users,
  Todos,
  Quotes,
} from "./pages"
import UserDetails from "./pages/UserDetails"
import NotFound from "./pages/NotFound"

const App: React.FC = () => {
  const auth = useAuth()
  const { collapsed } = useSidebar()
  console.log(auth.user)

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
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="*" element={<NotFound />} />
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
