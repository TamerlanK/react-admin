import { FaBoxOpen, FaHome, FaQuoteRight, FaUsers } from "react-icons/fa"
import { VscChecklist } from "react-icons/vsc"

export const sidebarRoutes = [
  {
    icon: FaHome,
    label: "Home",
    to: "/dashboard",
  },
  {
    icon: FaBoxOpen,
    label: "Products",
    to: "/products",
  },
  {
    icon: FaUsers,
    label: "Users",
    to: "/users",
  },
  {
    icon: VscChecklist,
    label: "Todos",
    to: "/todos",
  },
  {
    icon: FaQuoteRight,
    label: "Quotes",
    to: "/quotes",
  },
]
