import React, { useState } from "react"
import { useAuth } from "./context/AuthProvider"
import useProductFetch from "./hooks/useProductFetch"
import { BiSortUp, BiSortDown, BiSort } from "react-icons/bi"
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md"

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { ProductType } from "./lib/types"
import Loader from "./components/Loader"

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
            <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs bg-gray-100 p-4 rounded shadow-md">
              <div className="sm:mr-auto sm:mb-0 mb-2 flex items-center">
                <span className="mr-2 text-gray-700">Items per page</span>
                <select
                  className="border p-1 rounded w-16 border-gray-300 bg-white shadow-sm hover:shadow-md focus:outline-none focus:border-blue-500"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value))
                  }}
                >
                  {[2, 4, 6, 8].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  className={`${
                    !table.getCanPreviousPage()
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "hover:bg-gray-400 text-gray-800"
                  } rounded p-1 focus:outline-none`}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <MdKeyboardDoubleArrowLeft size={18} />
                </button>
                <button
                  className={`${
                    !table.getCanPreviousPage()
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "hover:bg-gray-400 text-gray-800"
                  } rounded p-1 focus:outline-none`}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <MdKeyboardArrowLeft size={18} />
                </button>
                <span className="flex items-center gap-1 text-gray-700">
                  <input
                    min={1}
                    max={table.getPageCount()}
                    type="number"
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0
                      table.setPageIndex(page)
                    }}
                    className="border p-1 rounded w-10 text-center bg-white border-gray-300"
                  />
                  of {table.getPageCount()}
                </span>
                <button
                  className={`${
                    !table.getCanNextPage()
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "hover:bg-gray-400 text-gray-800"
                  } rounded p-1 focus:outline-none`}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <MdKeyboardArrowRight size={18} />
                </button>
                <button
                  className={`${
                    !table.getCanNextPage()
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "hover:bg-gray-400 text-gray-800"
                  } rounded p-1 focus:outline-none`}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <MdKeyboardDoubleArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
