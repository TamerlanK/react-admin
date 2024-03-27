import {
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React, { useState } from "react"

import useFetch from "../hooks/useFetch"

import HeadText from "../components/HeadText"
import Loader from "../components/Loader"
import {
  ItemsPerPageSelect,
  PaginationButtons,
  TableBody,
  TableHeader,
  Wrapper,
} from "../components/table"

import { userColumns } from "../lib/tableConfig/userColumns"
import { FaPlus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Products: React.FC = () => {
  const { data, loading } = useFetch("https://dummyjson.com/users")
  const [sorting, setSorting] = useState<SortingState>([])
  const navigate = useNavigate()

  const table = useReactTable({
    data: data?.users,
    columns: userColumns,
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
    <Wrapper>
      <div className="w-full flex justify-between items-center">
        <HeadText>Users</HeadText>
        <button
          className="p-2 rounded-md bg-blue-600"
          onClick={() => navigate(`create`)}
        >
          <FaPlus className="text-white size-3" />
        </button>
      </div>

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
    </Wrapper>
  )
}

export default Products
