import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface SidebarStore {
  collapsed: boolean
  onExpand: () => void
  onCollapse: () => void
}

export const useSidebar = create<SidebarStore>()(
  persist(
    (set) => ({
      collapsed: true,
      onExpand: () => set(() => ({ collapsed: false })),
      onCollapse: () => set(() => ({ collapsed: true })),
    }),
    {
      name: "sidebar-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
