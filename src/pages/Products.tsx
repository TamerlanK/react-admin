import React, { useState } from "react"

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import useFetch from "../hooks/useFetch"

import HeadText from "../components/HeadText"
import Loader from "../components/Loader"
import { productColumns } from "../lib/tableConfig/productColumns"
import {
  ItemsPerPageSelect,
  PaginationButtons,
  TableBody,
  TableHeader,
  Wrapper,
} from "../components/table"
import CreateProductModal from "../components/modals/CreateProductModal"
import { FaPlus } from "react-icons/fa"

const Products: React.FC = () => {
  const { data, loading } = useFetch("https://dummyjson.com/products?limit=100")
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: data?.products,
    columns: productColumns,
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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  if (loading) {
    return <Loader />
  }

  return (
    <Wrapper>
      <div className="w-full flex items-center justify-between">
        <HeadText>Products</HeadText>
        <button
          className="p-2 rounded-md bg-blue-600"
          onClick={() => setIsCreateModalOpen(true)}
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
      <CreateProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Wrapper>
  )
}

export default Products
