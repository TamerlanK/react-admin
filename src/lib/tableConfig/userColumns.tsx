import { createColumnHelper } from "@tanstack/react-table"
import { UserType } from "../types"

const columnHelper = createColumnHelper<UserType>()

export const userColumns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("id", {
    id: "action",
    header: () => <span className="mx-auto">action</span>,
    cell: ({ row }) => {
      const { id } = row.original
    },
  }),
]
