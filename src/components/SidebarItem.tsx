import { useState, useEffect } from "react"
import { IconType } from "react-icons"
import { useSidebar } from "../store/useSidebar"
import { cn } from "../lib/utils"
import { Link, useLocation } from "react-router-dom"

interface SidebarItemProps {
  icon: IconType
  label: string
  to: string
}

const SidebarItem = ({ icon: Icon, label, to }: SidebarItemProps) => {
  const { collapsed } = useSidebar()
  const { pathname } = useLocation()

  const [showLabel, setShowLabel] = useState<boolean>(false)
  const isActive = pathname === to || pathname.startsWith(`${to}/`)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLabel(!collapsed)
    }, 100)
    return () => clearTimeout(timeoutId)
  }, [collapsed])

  return (
    <Link to={to}>
      <button
        className={cn(
          "group w-full flex items-center hover:bg-slate-600/50 p-4",
          isActive && "bg-slate-500/60 hover:bg-slate-500/60"
        )}
      >
        <div className="flex items-center w-6 h-8 mr-2">
          <Icon
            className={cn(
              "h-6 w-6 shrink-0 text-slate-400 group-hover:text-slate-200/90 transition-colors duration-150",
              isActive && "text-slate-100 group-hover:text-slate-100"
            )}
          />
        </div>
        {showLabel && (
          <p
            className={cn(
              "text-slate-300 group-hover:text-slate-200/90 transition-colors duration-150",
              isActive && "text-slate-100 group-hover:text-slate-100"
            )}
          >
            {label}
          </p>
        )}
      </button>
    </Link>
  )
}

export default SidebarItem
