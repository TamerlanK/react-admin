import React, { useState, useTransition } from "react"

import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
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

import { FaEdit, FaTrash } from "react-icons/fa"
import { deleteProduct, updateProduct } from "../actions/product"
import { ProductType } from "../lib/types"

const columnHelper = createColumnHelper<ProductType>()

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
  columnHelper.accessor("id", {
    id: "action",
    header: () => <span className="mx-auto">action</span>,
    cell: ({ row }) => {
      const { id } = row.original

      const [isPending, startTransition] = useTransition()

      const handleEdit = async () => {
        startTransition(() => {
          updateProduct(id, { title: "Item updated" })
        })
      }

      const handleDelete = async () => {
        startTransition(() => {
          deleteProduct(id)
        })
      }

      return (
        <div className="flex justify-center gap-x-4 items-center">
          <button onClick={handleEdit} disabled={isPending}>
            <FaEdit
              className={`text-blue-600 size-4 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </button>
          <button onClick={handleDelete} disabled={isPending}>
            <FaTrash
              className={`text-red-600 size-4 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </button>
        </div>
      )
    },
    enableSorting: false,
  }),
]

const Products: React.FC = () => {
  const { data, loading } = useFetch("https://dummyjson.com/products?limit=100")
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: data?.products,
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
      <HeadText>Products</HeadText>

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
