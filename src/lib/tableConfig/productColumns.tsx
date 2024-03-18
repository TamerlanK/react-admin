import { useState } from "react"
import { createColumnHelper } from "@tanstack/react-table"
import { deleteProduct } from "../../actions/product"
import { notify } from "../utils"
import Swal from "sweetalert2"

import PhotoAlbum, { Photo } from "react-photo-album"
import Lightbox, { SlideImage } from "yet-another-react-lightbox"
import {
  Fullscreen,
  Slideshow,
  Thumbnails,
  Zoom,
  Counter,
} from "yet-another-react-lightbox/plugins"
import EditProductModal from "../../components/modals/EditProductModal"
import { ProductType } from "../types"
import { FaEdit, FaTrash } from "react-icons/fa"

import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import "yet-another-react-lightbox/plugins/counter.css"

const columnHelper = createColumnHelper<ProductType>()

export const productColumns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("thumbnail", {
    cell: (info) => {
      const photos: SlideImage[] = info.row.original.images.map((image) => ({
        src: image,
      }))

      const [isLightboxOpen, setIsLightboxOpen] = useState(false)
      const [index, setIndex] = useState(-1)

      return (
        <>
          <img
            onClick={() => setIsLightboxOpen(true)}
            className="w-12 mx-auto object-cover"
            src={info.getValue()}
          />

          <Lightbox
            open={isLightboxOpen}
            close={() => setIsLightboxOpen(false)}
            slides={photos}
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Counter]}
            counter={{
              container: {
                style: {
                  top: "unset",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)"
                },
              },
            }}
          />
          <PhotoAlbum
            photos={photos as Photo[]}
            layout="rows"
            targetRowHeight={150}
            onClick={({ index }) => setIndex(index)}
          />
        </>
      )
    },
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
