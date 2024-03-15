import { createColumnHelper } from "@tanstack/react-table"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { TodoType } from "../types"

const columnHelper = createColumnHelper<TodoType>()

export const todoColumns = [
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