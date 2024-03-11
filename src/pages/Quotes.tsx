import React, { useState } from "react"
import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import HeadText from "../components/HeadText"
import Loader from "../components/Loader"
import ItemsPerPageSelect from "../components/table/ItemsPerPageSelect"
import PaginationButtons from "../components/table/PaginationButtons"
import TableBody from "../components/table/TableBody"
import TableHeader from "../components/table/TableHeader"
import Wrapper from "../components/table/Wrapper"
import useFetch from "../hooks/useFetch"

import { QuoteType } from "../lib/types"

const columnHelper = createColumnHelper<QuoteType>()

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quote", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("author", {
    cell: (info) => info.getValue(),
  }),
]

const Quotes: React.FC = () => {
  const { data, loading } = useFetch("https://dummyjson.com/quotes")
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: data?.quotes,
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
      <HeadText>Quotes</HeadText>

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

export default Quotes
