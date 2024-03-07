import React from "react"
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md"

interface PaginationButtonsProps {
  table: any
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ table }) => (
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
          const page = e.target.value ? Number(e.target.value) - 1 : 0
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
)

export default PaginationButtons
