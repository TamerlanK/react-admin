import React, { useState } from "react"
import { useAuth } from "./context/AuthProvider"
import useProductFetch from "./hooks/useProductFetch"
import { BiSortUp, BiSortDown, BiSort } from "react-icons/bi"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table"
import { ProductType } from "./lib/types"

type ProductTableType = Pick<ProductType, "id" | "title" | "price" | "brand">

const columnHelper = createColumnHelper<ProductTableType>()

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    cell: (info) => info.getValue(),
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
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-100">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-2 font-semibold text-left cursor-pointer"
                          onClick={
                            header.column.getCanSort()
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          <div className="flex items-center">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span className="ml-1">
                                {header.column.getIsSorted() === "asc" ? (
                                  <BiSortUp className="h-4 w-4 text-gray-500" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <BiSortDown className="h-4 w-4 text-gray-500" />
                                ) : (
                                  <BiSort className="h-4 w-4 text-gray-500" />
                                )}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={index % 2 === 0 ? "bg-gray-50" : ""}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="border px-4 py-2 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
