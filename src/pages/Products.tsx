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

import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import { deleteProduct, updateProduct } from "../actions/product"
import { ProductType } from "../lib/types"
import CreateProductModal from "../components/modals/CreateProductModal"
import EditProductModal from "../components/modals/EditProductModal"
import Swal from "sweetalert2"

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
      }).format(info.getValue()!)
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

      const [isEditModalOpen, setIsEditModelOpen] = useState(false)
      const [isLoading, setIsLoading] = useState(false)

      const handleEdit = async () => {
        setIsEditModelOpen(true)
      }

      const handleDelete = async (id: number) => {
        setIsLoading(true)
        try {
          await deleteProduct(id)
          setIsLoading(false)
          Swal.fire(
            "Deleted!",
            `${row.original.title} has been deleted.`,
            "success"
          )
        } catch (error: any) {
          setIsLoading(false)
          Swal.fire(
            "Error!",
            "An error occurred while deleting the product: " + error.message,
            "error"
          )
        }
      }

      return (
        <div className="flex justify-center gap-x-4 items-center">
          <button onClick={handleEdit}>
            <FaEdit
              className={`text-blue-600 size-4 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </button>
          <button onClick={() => handleDelete(id)}>
            <FaTrash
              className={`text-red-600 size-4 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </button>
          <EditProductModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModelOpen(false)}
            initialData={row.original}
          />
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
