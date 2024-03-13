import React, { useState } from "react"

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import { TodoType } from "../lib/types"
import useFetch from "../hooks/useFetch"
import Loader from "../components/Loader"
import HeadText from "../components/HeadText"
import Wrapper from "../components/table/Wrapper"
import TableBody from "../components/table/TableBody"
import TableHeader from "../components/table/TableHeader"
import PaginationButtons from "../components/table/PaginationButtons"
import ItemsPerPageSelect from "../components/table/ItemsPerPageSelect"

const columnHelper = createColumnHelper<TodoType>()

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("todo", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("completed", {
    cell: (info) =>
      info.getValue() ? (
        <FaCheckCircle className="text-emerald-600" />
      ) : (
        <FaTimesCircle className="text-red-600" />
      ),
  }),
]

const Todos: React.FC = () => {
  const { data, loading } = useFetch("https://dummyjson.com/todos")
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: data?.todos,
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
    <Wrapper>
      <HeadText>Todos</HeadText>

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

export default Todos
