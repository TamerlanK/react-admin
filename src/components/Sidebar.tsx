import React from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { useSidebar } from "../store/useSidebar"

import Logo from "/logo.png"

const Sidebar: React.FC = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar()

  const toggleSidebar = () => {
    if (collapsed) {
      onExpand()
    } else {
      onCollapse()
    }
  }

  return (
    <div
      className={`bg-slate-800 h-full fixed left-0 top-0 ${
        collapsed ? "w-14" : "w-56"
      } transition-all duration-300 z-10`}
      onMouseEnter={onExpand}
      onMouseLeave={onCollapse}
    >
      {/* Company Logo */}
      <div className="py-4 px-2 flex items-center justify-center">
        <img src={Logo} alt="Company Logo" className="h-8 w-8" />
      </div>

      {/* Sidebar Body */}
      <div className="flex flex-col h-full">
        {/* Sections */}
        {/* Add your sidebar sections here */}

        {/* Collapse/Expand Button */}
        <button
          className="flex items-center justify-center mt-auto py-3 text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          {collapsed ? (
            <FiChevronRight className="w-6 h-6" />
          ) : (
            <FiChevronLeft className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
