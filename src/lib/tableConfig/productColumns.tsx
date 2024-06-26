import { createColumnHelper } from "@tanstack/react-table"
import { useState } from "react"
import Swal from "sweetalert2"
import { deleteProduct } from "../../actions/product"
import { notify } from "../utils"

import { FaEdit, FaTrash } from "react-icons/fa"
import EditProductModal from "../../components/modals/EditProductModal"
import { ProductType } from "../types"

import "yet-another-react-lightbox/plugins/counter.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import "yet-another-react-lightbox/styles.css"
import CustomLightbox from "../../components/CustomLightbox"

const columnHelper = createColumnHelper<ProductType>()

export const productColumns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("thumbnail", {
    cell: (info) => <CustomLightbox images={info.row.original.images} thumbnailImg={info.getValue()}/>,
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
        const result = await Swal.fire({
          title: "Are you sure?",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
        })

        if (result.isConfirmed) {
          setIsLoading(true)
          try {
            await deleteProduct(id)
            setIsLoading(false)
            notify(`${row.original.title} has been deleted.`, "success")
          } catch (error: any) {
            setIsLoading(false)
            notify("An error occurred while deleting the product", "error")
          }
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
