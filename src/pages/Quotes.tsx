import {
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React, { useState } from "react"

import HeadText from "../components/HeadText"
import Loader from "../components/Loader"
import {
  ItemsPerPageSelect,
  PaginationButtons,
  TableBody,
  TableHeader,
  Wrapper,
} from "../components/table"
import useFetch from "../hooks/useFetch"
import { quoteColumns } from "../lib/tableConfig/quoteColumns"

const Quotes: React.FC = () => {
  const { data, loading } = useFetch("https://dummyjson.com/quotes")
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: data?.quotes,
    columns: quoteColumns,
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
