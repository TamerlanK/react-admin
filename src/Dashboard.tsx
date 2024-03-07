import React, { useState } from "react"
import { useAuth } from "./context/AuthProvider"
import useProductFetch from "./hooks/useProductFetch"

import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Loader from "./components/Loader"
import ItemsPerPageSelect from "./components/table/ItemsPerPageSelect"
import PaginationButtons from "./components/table/PaginationButtons"
import TableBody from "./components/table/TableBody"
import TableHeader from "./components/table/TableHeader"
import { ProductType } from "./lib/types"

export type ProductTableType = Pick<
  ProductType,
  "id" | "title" | "price" | "brand"
>

const columnHelper = createColumnHelper<ProductTableType>()

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    cell: (info) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(info.getValue())
      return formatted
    },
  }),
  columnHelper.accessor("brand", {
    cell: (info) => info.getValue(),
  }),
]

const Dashboard: React.FC = () => {
  const auth = useAuth()
  const { products, loading } = useProductFetch(auth.token)
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (loading) {
    return <Loader />
  }

  return (
    <div className="w-full mx-auto p-4 pl-0 h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <TableHeader headerGroups={table.getHeaderGroups()} />
              <TableBody rows={table.getRowModel().rows} />
            </table>
            <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs bg-gray-100 p-4 rounded shadow-md">
              <div className="sm:mr-auto sm:mb-0 mb-2 flex items-center">
                <span className="mr-2 text-gray-700">Items per page</span>
                <ItemsPerPageSelect
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                />
              </div>
              <PaginationButtons table={table} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
