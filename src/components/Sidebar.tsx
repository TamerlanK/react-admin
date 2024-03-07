import React, { useEffect, useState } from "react"
import { useSidebar } from "../store/useSidebar"
import { cn } from "../lib/utils"

import Logo from "/logo.png"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { sidebarRoutes } from "../lib/data"
import SidebarItem from "./SidebarItem"
import { Link } from "react-router-dom"

const Sidebar: React.FC = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar()

  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (!collapsed) {
      setIsClicked(true)
    }
  }, [])

  const toggleSidebar = () => {
    if (collapsed) {
      onExpand()
    } else {
      onCollapse()
    }
  }

  const handleClick = () => {
    toggleSidebar()
    setIsClicked((prev) => !prev)
  }

  return (
    <div
      className={cn(
        "bg-slate-800 h-full fixed left-0 flex flex-col justify-between transition-all duration-300 z-10 inset-y-0",
        collapsed ? "w-14" : "w-56"
      )}
    >
      <Link to={"/dashboard"}>
        <div className="h-14 flex justify-center items-center">
          <img src={Logo} alt="Logo" className="w-14" />
        </div>
      </Link>
      <div
        className="flex-grow bg-slate-700"
        onMouseEnter={!isClicked ? toggleSidebar : undefined}
        onMouseLeave={!isClicked ? toggleSidebar : undefined}
      >
        {sidebarRoutes.map((route) => (
          <SidebarItem key={route.to} {...route} />
        ))}
      </div>

      <button
        className="text-white cursor-pointer w-full flex justify-center items-center h-14 focus:outline-none"
        onClick={handleClick}
        aria-label={`${collapsed ? "Expand" : "Collapse"} Sidebar`}
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
    </div>
  )
}

export default Sidebar
