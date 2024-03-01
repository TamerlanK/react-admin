import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

const Header: React.FC = () => {
  const auth = useAuth()

  // Common JSX elements for authenticated and unauthenticated states
  const authLinks = (
    <div className="flex gap-x-4 items-center">
      <span className="text-gray-700">
        Welcome, {auth.user && auth.user.username}!
      </span>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => auth.logOut()}
      >
        Logout
      </button>
    </div>
  )

  const unauthLinks = (
    <div className="flex gap-x-4 items-center">
      <Link
        to="/register"
        className="text-gray-500 hover:text-gray-800 transition-colors"
      >
        Register
      </Link>
      <Link
        to="/login"
        className="text-gray-500 hover:text-gray-800 transition-colors"
      >
        Login
      </Link>
    </div>
  )

  return (
    <div className="bg-white h-14 px-8 flex justify-between items-center fixed w-full inset-x-0">
      <h1 className="text-xl font-semibold text-gray-700">React Admin</h1>
      {auth.user ? authLinks : unauthLinks}
    </div>
  )
}

export default Header
