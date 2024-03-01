import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { FiUser, FiLogOut } from "react-icons/fi"
import { useAuth } from "../context/AuthProvider"
import { useSidebar } from "../store/useSidebar"
import { cn } from "../lib/utils"
import useClickOutside from "../hooks/useClickOutside"

const Header: React.FC = () => {
  const auth = useAuth()
  const { collapsed } = useSidebar()
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setShowDropdown((prev) => !prev)
  const closeDropdown = () => setShowDropdown(false)

  useClickOutside(dropdownRef, closeDropdown)

  const handleUserButtonClick = () => {
    if (!showDropdown) toggleDropdown()
  }

  const handleLogout = () => {
    auth.logOut()
    closeDropdown()
  }

  const userLinks = (
    <>
      <button
        onClick={handleUserButtonClick}
        className="text-slate-800 focus:outline-none rounded-full p-3 bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <FiUser className="w-6 h-6" />
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-14 right-8 bg-white shadow-lg rounded-md mt-1"
        >
          <div className="py-2">
            <p className="px-4 py-2 text-gray-700">
              {auth.user && auth.user.username}
            </p>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <FiLogOut className="inline-block w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  )

  const guestLinks = (
    <>
      <Link
        to="/login"
        className="text-gray-400 hover:text-gray-800 transition-colors"
      >
        Daxil ol
      </Link>
      <Link
        to="/register"
        className="text-gray-400 hover:text-gray-800 transition-colors"
      >
        Qeydiyyat
      </Link>
    </>
  )

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 bg-white h-14 px-8 flex justify-between items-center transition-all duration-300",
        auth.user && (collapsed ? "pl-[88px]" : "pl-64")
      )}
    >
      <h1 className="text-xl font-semibold text-gray-700">React Admin</h1>
      <div className="flex gap-x-4 items-center">
        {auth.user ? userLinks : guestLinks}
      </div>
    </div>
  )
}

export default Header
