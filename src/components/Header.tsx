import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { FiUser, FiLogOut } from "react-icons/fi"
import { useAuth } from "../context/AuthProvider"
import { useSidebar } from "../store/useSidebar"
import useClickOutside from "../hooks/useClickOutside"
import { cn } from "../lib/utils"

const Header: React.FC = () => {
  const auth = useAuth()
  const { collapsed } = useSidebar()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  const handleLogout = () => {
    auth.logOut()
    setIsDropdownOpen(false)
  }

  const handleClickOutside = () => {
    setIsDropdownOpen(false)
  }

  useClickOutside(dropdownRef, handleClickOutside)

  const userLinks = (
    <div className="relative">
      <button
        className={cn(
          "text-slate-800 focus:outline-none rounded-full p-3 bg-gray-100 hover:bg-gray-200 transition-colors",
          isDropdownOpen && "opacity-80 hover:bg-gray-100"
        )}
        onClick={toggleDropdown}
      >
        <FiUser className="w-6 h-6" />
      </button>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
        >
          <div className="py-1">
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <FiLogOut className="mr-2 inline-block" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
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
